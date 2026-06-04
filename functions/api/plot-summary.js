export async function onRequestPost(context) {
  try {
    const requestBody = await context.request.json();
    const { plot } = requestBody || {};

    if (!plot || typeof plot !== "object") {
      return json(
        {
          ok: false,
          error: "Missing plot payload."
        },
        400
      );
    }

    const apiKey = context.env.OPENAI_API_KEY;
    const model = context.env.OPENAI_MODEL || "gpt-5.4-mini";

    if (!apiKey) {
      return json({
        ok: false,
        mode: "fallback",
        error: "OPENAI_API_KEY is not configured in Cloudflare Pages environment variables.",
        summary: `${plot.aiSummary} This is still the local fallback because the OpenAI API key has not been added in deployment settings yet.`
      });
    }

    const prompt = [
      `You are a concise farm operations assistant for an organic farming project.`,
      `Give a short practical summary for one land parcel.`,
      `Use simple language, avoid jargon, and keep it under 90 words.`,
      `Include: current state, immediate next action, and one caution if needed.`,
      ``,
      `Plot: ${plot.title}`,
      `Position: ${plot.position}`,
      `Area: ${plot.area}`,
      `State: ${plot.state}`,
      `Condition: ${plot.condition}`,
      `Current focus: ${plot.cycle}`,
      `Current snapshot: ${plot.current}`
    ].join("\n");

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        input: prompt,
        text: {
          format: {
            type: "text"
          }
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();

      return json({
        ok: false,
        mode: "fallback",
        error: `OpenAI request failed: ${errorText}`,
        summary: `${plot.aiSummary} This is the local fallback because the OpenAI request did not complete successfully.`
      });
    }

    const data = await response.json();
    const summary = typeof data.output_text === "string" && data.output_text.trim()
      ? data.output_text.trim()
      : `${plot.aiSummary} This is the local fallback because no text output was returned.`;

    return json({
      ok: true,
      mode: "openai",
      summary
    });
  } catch (error) {
    return json({
      ok: false,
      mode: "fallback",
      error: error instanceof Error ? error.message : "Unknown error",
      summary: "The AI route hit an unexpected issue, so the local plot note should be used instead."
    });
  }
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}
