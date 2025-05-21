const OPENROUTER_API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY;

export async function generateCoverLetter(jd, skills) {
  const body = {
    model: "deepseek/deepseek-r1-distill-llama-70b:free",
    messages: [
      {
        role: "user",
        content: `Generate a concise cover letter and a one-line subject for the following job description:${jd}Highlight these skills: ${skills.join(
          ", "
        )}.Please provide output as plain text, no markdown or special characters. The subject line should start with "Subject: " and be followed by a new line. The cover letter should be in a professional tone, suitable for a job application.`,
      },
    ],
  };

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return data.choices[0]?.message?.content || "Failed to generate content.";
}

// utils/api.js

export async function suggestSkills(jd) {
    const body = {
      model: "deepseek/deepseek-r1-distill-llama-70b:free",
      messages: [
        {
          role: "user",
          content: `Extract the top 5 relevant skills from the following job description, as a comma-separated list with no other text: ${jd}`,
        },
      ],
    };
  
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer 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",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  
    const data = await res.json();
  
    const skillsText = data.choices[0]?.message?.content || "";
    // Expecting "skill1, skill2, skill3, skill4, skill5"
    const skillsArray = skillsText
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  
    return skillsArray.slice(0, 5);
  }
  