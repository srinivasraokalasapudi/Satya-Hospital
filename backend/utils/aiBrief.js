// Strict JSON Schema for the brief. Combined with response_format.strict = true
// (supported by openai/gpt-oss-20b and openai/gpt-oss-120b on Groq), the model
// uses constrained decoding so the response is GUARANTEED to be valid JSON
// matching this exact shape - Groq will never return a "Failed to generate
// JSON" / failed_generation error for this call.
const AI_BRIEF_SCHEMA = {
  type: "object",
  properties: {
    english: { type: "string" },
    telugu: { type: "string" },
    hindi: { type: "string" }
  },
  required: ["english", "telugu", "hindi"],
  additionalProperties: false
};

async function callGroqForBrief(apiKey, model, systemPrompt, userPrompt) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "multilingual_brief",
          strict: true,
          schema: AI_BRIEF_SCHEMA
        }
      },
      // Three languages (incl. Telugu/Hindi native script, which use more
      // tokens per word than English) need real headroom so the JSON never
      // gets cut off mid-object.
      max_tokens: 3000,
      temperature: 0.25
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.error?.message || `Groq request failed with HTTP ${response.status}`;
    const err = new Error(message);
    err.code = data?.error?.code || data?.error?.type || "GROQ_REQUEST_FAILED";
    err.status = response.status;
    if (data?.error?.failed_generation) {
      console.error("Groq failed_generation (debug):", String(data.error.failed_generation).slice(0, 300));
    }
    throw err;
  }
  return data;
}

// Shared multilingual (English/Telugu/Hindi) brief generator used for both
// doctor "patient problem" briefs and service "what to expect" briefs.
async function generateMultilingualBrief(systemPrompt, userPrompt) {
  const apiKey = String(process.env.GROQ_API_KEY || "").trim();
  if (!apiKey) {
    const err = new Error("GROQ_API_KEY is missing. Add it to backend/.env and restart the backend.");
    err.code = "GROQ_NOT_CONFIGURED";
    throw err;
  }

  // llama-3.3-70b-versatile is deprecated on Groq (shutting down 08/16/26) and
  // only supports best-effort JSON mode, which can occasionally fail. GPT-OSS
  // 120B is Groq's recommended replacement and supports strict JSON Schema
  // mode (see AI_BRIEF_SCHEMA above), which cannot fail to produce valid JSON.
  const model = String(process.env.GROQ_MODEL || "openai/gpt-oss-120b").trim();

  const MAX_ATTEMPTS = 2;
  let lastError;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const data = await callGroqForBrief(apiKey, model, systemPrompt, userPrompt);
      const raw = data?.choices?.[0]?.message?.content?.trim();
      if (!raw) throw new Error("Groq returned an empty AI brief.");
      const parsed = JSON.parse(raw);
      if (!parsed.english || !parsed.telugu || !parsed.hindi) throw new Error("Groq did not return all three language briefs.");
      return { english: String(parsed.english).trim(), telugu: String(parsed.telugu).trim(), hindi: String(parsed.hindi).trim() };
    } catch (error) {
      lastError = error;
      console.error(`AI brief generation attempt ${attempt} failed:`, error.message);
      // Only retry transient issues (rate limit, server error, network blip) -
      // not bad API keys / bad requests, which will just fail again.
      const retryable = error.status === 429 || (error.status >= 500 && error.status < 600) || !error.status;
      if (attempt < MAX_ATTEMPTS && retryable) {
        await new Promise((resolve) => setTimeout(resolve, 600 * attempt));
        continue;
      }
      break;
    }
  }
  throw lastError;
}

module.exports = { generateMultilingualBrief };
