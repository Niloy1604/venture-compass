import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { companyName, companyWebsite, companyDescription, industry, stage, location } = await req.json();

    if (!companyName || !companyWebsite) {
      return new Response(
        JSON.stringify({ error: "companyName and companyWebsite are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch the company's homepage text
    let websiteText = "";
    const scrapedSources: { url: string; scrapedAt: string }[] = [];
    const pagesToFetch = ["", "/about", "/careers"];

    for (const path of pagesToFetch) {
      const pageUrl = companyWebsite.replace(/\/$/, "") + path;
      try {
        const pageResp = await fetch(pageUrl, {
          headers: { "User-Agent": "VentureLens/1.0 (company research tool)" },
          signal: AbortSignal.timeout(8000),
        });
        if (pageResp.ok) {
          const html = await pageResp.text();
          // Strip scripts, styles, and HTML tags to get readable text
          const cleaned = html
            .replace(/<script[\s\S]*?<\/script>/gi, "")
            .replace(/<style[\s\S]*?<\/style>/gi, "")
            .replace(/<[^>]+>/g, " ")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 8000); // limit per page
          if (cleaned.length > 100) {
            websiteText += `\n\n--- Content from ${pageUrl} ---\n${cleaned}`;
            scrapedSources.push({ url: pageUrl, scrapedAt: new Date().toISOString() });
          }
        }
      } catch (e) {
        console.log(`Could not fetch ${pageUrl}: ${e}`);
      }
    }

    const hasWebContent = websiteText.length > 200;

    const systemPrompt = `You are a venture capital analyst. Analyze the company and return structured intelligence. 
You MUST respond with a valid JSON object using this exact structure:
{
  "summary": "2-3 sentence summary of the company and its market position",
  "whatTheyDo": ["item1", "item2", "item3", "item4"],
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5", "keyword6"],
  "signals": ["signal1", "signal2", "signal3"]
}

- summary: A concise 2-3 sentence analysis of the company, its competitive position, and market opportunity
- whatTheyDo: 3-5 specific things the company does or builds
- keywords: 5-8 relevant keywords/technologies
- signals: 2-4 investment-relevant signals (hiring, growth, product launches, partnerships)

Return ONLY the JSON object, no markdown, no code blocks.`;

    const userPrompt = `Analyze this company for venture capital intelligence:

Company: ${companyName}
Website: ${companyWebsite}
Description: ${companyDescription || "N/A"}
Industry: ${(industry || []).join(", ")}
Stage: ${stage || "Unknown"}
Location: ${location || "Unknown"}

${hasWebContent ? `Website content scraped:\n${websiteText.slice(0, 15000)}` : "No website content available. Use your knowledge of this company."}`;

    console.log(`Enriching ${companyName} - scraped ${scrapedSources.length} pages, ${websiteText.length} chars`);

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!aiResponse.ok) {
      const status = aiResponse.status;
      if (status === 429) {
        return new Response(
          JSON.stringify({ error: "AI rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errText = await aiResponse.text();
      console.error("AI gateway error:", status, errText);
      return new Response(
        JSON.stringify({ error: "AI analysis failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await aiResponse.json();
    const rawContent = aiData.choices?.[0]?.message?.content || "";

    // Parse the JSON from the AI response
    let enrichment;
    try {
      // Try to extract JSON from the response (handle markdown code blocks too)
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        enrichment = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in AI response");
      }
    } catch (parseErr) {
      console.error("Failed to parse AI response:", rawContent);
      // Graceful fallback
      enrichment = {
        summary: `${companyName} is a ${stage || ""} ${(industry || []).join("/")} company based in ${location || "unknown location"}. ${companyDescription || ""}`,
        whatTheyDo: [companyDescription || `Operates in ${(industry || []).join(", ")}`],
        keywords: industry || [],
        signals: ["Enrichment returned partial data"],
      };
    }

    // Validate and normalize the output
    const result = {
      summary: typeof enrichment.summary === "string" ? enrichment.summary : "",
      whatTheyDo: Array.isArray(enrichment.whatTheyDo) ? enrichment.whatTheyDo : [],
      keywords: Array.isArray(enrichment.keywords) ? enrichment.keywords : [],
      signals: Array.isArray(enrichment.signals) ? enrichment.signals : [],
      sources: scrapedSources,
    };

    console.log(`Enrichment complete for ${companyName}`);

    return new Response(JSON.stringify({ success: true, enrichment: result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("enrich-company error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
