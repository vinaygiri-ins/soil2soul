export async function onRequestPost(context) {
  try {
    const requestBody = await context.request.json();
    const { plot, project, task } = requestBody || {};

    if (!plot || typeof plot !== "object") {
      return json(
        {
          ok: false,
          error: "Missing plot payload."
        },
        400
      );
    }

    const providerConfig = getProviderConfig(context.env);
    const { apiKey, model, baseUrl, providerLabel } = providerConfig;

    if (!apiKey) {
      if (task === "action-plan") {
        return json({
          ok: false,
          mode: "fallback",
          error: `${providerLabel} API key is not configured in Cloudflare Pages environment variables.`,
          plan: null
        });
      }

      return json({
        ok: false,
        mode: "fallback",
        error: `${providerLabel} API key is not configured in Cloudflare Pages environment variables.`,
        summary: buildFallbackSummary(
          plot,
          `This is still the local fallback because the ${providerLabel} API key has not been added in deployment settings yet.`
        )
      });
    }

    if (task === "action-plan") {
      const actionPrompt = [
        `You are a concise farm operations assistant for an organic farming project.`,
        `Return valid JSON only.`,
        `Create a practical action plan from the current project notes.`,
        `Keys required: immediateAction, weekAction, monthAction, monitoring, timeline.`,
        `timeline must be an array of exactly 3 short strings.`,
        `Use simple language and make the advice practical, operational, and organic-farming aware.`,
        ``,
        `Plot: ${plot.title}`,
        `Position: ${plot.position}`,
        `Area: ${plot.area}`,
        `State: ${plot.state}`,
        `Condition: ${plot.condition}`,
        `Project name: ${project?.projectName || "Not set"}`,
        `Project intention: ${project?.intention || "Not set"}`,
        `Latitude: ${project?.latitude || "Not set"}`,
        `Longitude: ${project?.longitude || "Not set"}`,
        `Latest soil notes: ${stringifyNotes(project?.notes?.soil)}`,
        `Latest crop notes: ${stringifyNotes(project?.notes?.crop)}`,
        `Latest produce notes: ${stringifyNotes(project?.notes?.produce)}`
      ].join("\n");

      const actionResponse = await fetch(`${baseUrl}/responses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify(buildResponsesRequest(model, actionPrompt))
      });

      if (!actionResponse.ok) {
        const errorText = await actionResponse.text();

        return json({
          ok: false,
          mode: "fallback",
          error: `${providerLabel} request failed: ${errorText}`,
          plan: null
        });
      }

      const actionData = await actionResponse.json();
      const outputText = extractResponseText(actionData);

      try {
        const parsedPlan = JSON.parse(extractJsonBlock(outputText));
        return json({
          ok: true,
          mode: providerConfig.mode,
          plan: normalizePlan(parsedPlan)
        });
      } catch {
        return json({
          ok: false,
          mode: "fallback",
          error: `${providerLabel} returned action text that could not be parsed as JSON.`,
          plan: null
        });
      }
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

    const response = await fetch(`${baseUrl}/responses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(buildResponsesRequest(model, prompt))
    });

    if (!response.ok) {
      const errorText = await response.text();

      return json({
        ok: false,
        mode: "fallback",
        error: `${providerLabel} request failed: ${errorText}`,
        summary: buildFallbackSummary(
          plot,
          `This is the local fallback because the ${providerLabel} request did not complete successfully.`
        )
      });
    }

    const data = await response.json();
    const responseText = extractResponseText(data);
    const summary = responseText
      ? responseText
      : buildFallbackSummary(plot, "This is the local fallback because no text output was returned.");

    return json({
      ok: true,
      mode: providerConfig.mode,
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

function buildResponsesRequest(model, input) {
  return {
    model,
    input
  };
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

function getProviderConfig(env) {
  const provider = String(env.AI_PROVIDER || "").trim().toLowerCase();

  if (provider === "groq") {
    return {
      apiKey: env.GROQ_API_KEY,
      model: env.GROQ_MODEL || "openai/gpt-oss-20b",
      baseUrl: "https://api.groq.com/openai/v1",
      providerLabel: "Groq",
      mode: "groq"
    };
  }

  return {
    apiKey: env.OPENAI_API_KEY,
    model: env.OPENAI_MODEL || "gpt-5.4-mini",
    baseUrl: "https://api.openai.com/v1",
    providerLabel: "OpenAI",
    mode: "openai"
  };
}

function extractResponseText(data) {
  if (typeof data?.output_text === "string" && data.output_text.trim()) {
    return data.output_text.trim();
  }

  if (Array.isArray(data?.output)) {
    const textParts = [];

    for (const item of data.output) {
      if (!Array.isArray(item?.content)) {
        continue;
      }

      for (const contentItem of item.content) {
        if (typeof contentItem?.text === "string" && contentItem.text.trim()) {
          textParts.push(contentItem.text.trim());
        }
      }
    }

    if (textParts.length > 0) {
      return textParts.join("\n").trim();
    }
  }

  if (Array.isArray(data?.choices) && typeof data.choices[0]?.message?.content === "string") {
    return data.choices[0].message.content.trim();
  }

  return "";
}

function extractJsonBlock(text) {
  const trimmed = String(text || "").trim();

  if (!trimmed) {
    return "";
  }

  const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fencedMatch?.[1]) {
    return fencedMatch[1].trim();
  }

  const objectStart = trimmed.indexOf("{");
  const objectEnd = trimmed.lastIndexOf("}");
  if (objectStart !== -1 && objectEnd !== -1 && objectEnd > objectStart) {
    return trimmed.slice(objectStart, objectEnd + 1);
  }

  return trimmed;
}

function buildFallbackSummary(plot, reason) {
  const title = plot?.title || "This plot";
  const state = plot?.state || "needs field review";
  return `${title} is currently marked as ${state}. ${reason}`;
}

function stringifyNotes(notes) {
  if (!Array.isArray(notes) || notes.length === 0) {
    return "No notes yet.";
  }

  return notes
    .slice(0, 3)
    .map((note) => `${note.timestamp || "unknown time"}: ${note.text || ""}`)
    .join(" | ");
}

function normalizePlan(plan) {
  return {
    immediateAction: String(plan?.immediateAction || "No immediate action returned."),
    weekAction: String(plan?.weekAction || "No weekly action returned."),
    monthAction: String(plan?.monthAction || "No monthly action returned."),
    monitoring: String(plan?.monitoring || "No monitoring note returned."),
    timeline: Array.isArray(plan?.timeline) && plan.timeline.length > 0
      ? plan.timeline.slice(0, 3).map((item) => String(item))
      : [
          "Review the current project notes.",
          "Take the next practical field action.",
          "Observe the result and log it again."
        ]
  };
}
