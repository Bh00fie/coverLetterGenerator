// Generates a cover letter server-side so the OpenAI API key never reaches the browser.
// Requires OPENAI_API_KEY to be set in the Netlify site's environment variables.

const LANGUAGES = [
    "english", "french", "italian", "spanish", "portuguese",
    "chinese", "japanese", "arabic", "filipino",
];

const LIMITS = { fullName: 200, positionName: 200, companyName: 200, cv: 20000, jobDescription: 20000 };

const json = (status, body) =>
    new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
    });

function buildPrompt({ fullName, positionName, companyName, cv, jobDescription, language }) {
    return `My name is ${fullName}, I am looking for job as ${positionName} for ${companyName}, and I would like you to help me write a cover letter that uses my past experiences and my technical skills in my CV and the job description of the position that I'm applying for to make a tailored cover letter (IT MUST NOT BE AN EMAIL). The cover letter must be less than one page so it must be maximum 250 to 350 words or 4-5 paragraphs. Make sure to also answer these questions: why are you interested in this job? How will it enhance your career? What about this company sets them apart? What have you specifically achieved that others haven't, and how will that serve you in this job?
My CV is:
${cv}

The job description is:
${jobDescription}

The cover letter must be written in ${language}.`;
}

export default async (req) => {
    if (req.method !== "POST") {
        return json(405, { error: "Method not allowed" });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.error("OPENAI_API_KEY is not set");
        return json(500, { error: "The server is not configured to generate cover letters." });
    }

    let body;
    try {
        body = await req.json();
    } catch {
        return json(400, { error: "Invalid JSON body" });
    }

    const fields = {};
    for (const [name, max] of Object.entries(LIMITS)) {
        const value = typeof body[name] === "string" ? body[name].trim() : "";
        if (!value) return json(400, { error: `Missing field: ${name}` });
        if (value.length > max) return json(400, { error: `${name} is too long (max ${max} characters)` });
        fields[name] = value;
    }

    const language = String(body.language || "english").toLowerCase();
    if (!LANGUAGES.includes(language)) {
        return json(400, { error: "Unsupported language" });
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: buildPrompt({ ...fields, language }) }],
                temperature: 0.8,
                max_tokens: 2000,
            }),
        });

        if (!response.ok) {
            console.error("OpenAI error:", response.status, await response.text());
            return json(502, { error: "Failed to generate the cover letter. Please try again later." });
        }

        const data = await response.json();
        const coverLetter = data.choices?.[0]?.message?.content;
        if (!coverLetter) {
            return json(502, { error: "The AI returned an empty response. Please try again." });
        }
        return json(200, { coverLetter });
    } catch (err) {
        console.error("Generation error:", err);
        return json(502, { error: "Failed to generate the cover letter. Please try again later." });
    }
};
