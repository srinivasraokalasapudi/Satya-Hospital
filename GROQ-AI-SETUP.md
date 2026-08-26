# Groq AI Problem Brief Setup

1. Create a Groq API key in GroqCloud.
2. Open `backend/.env`.
3. Set:
   GROQ_API_KEY=your_real_groq_api_key
   GROQ_MODEL=openai/gpt-oss-120b
4. Never put the key in the frontend or commit `.env` to GitHub.
5. Restart the backend with `npm run dev`.
6. Book a new doctor appointment and enter the patient's problem.

The backend sends the problem to Groq's OpenAI-compatible chat completions endpoint.
The generated brief is stored with the doctor appointment and shown in Doctors Appointments.

## Why `openai/gpt-oss-120b` and not `llama-3.3-70b-versatile`

- `llama-3.3-70b-versatile` is **deprecated on Groq** and shuts down **08/16/2026**.
  Groq's official recommended replacement is `openai/gpt-oss-120b`.
- `openai/gpt-oss-120b` supports Groq's **strict JSON Schema mode**
  (`response_format.json_schema.strict = true`), which uses constrained
  decoding to *guarantee* valid JSON output. The old model only supported
  best-effort `json_object` mode, which is what caused the
  `"Failed to generate JSON... failed_generation"` error — especially for this
  feature, since it has to produce English + Telugu + Hindi in one response.
- If you ever see that error again, it means whichever model is set in
  `GROQ_MODEL` doesn't support strict mode. Stick to `openai/gpt-oss-120b` or
  `openai/gpt-oss-20b` (see `console.groq.com/docs/structured-outputs`).
