// src/services/aiService.js

export async function generateDraftFromPrompt(prompt) {
  console.log("AI PROMPT:", prompt);

  await new Promise((resolve) =>
    setTimeout(resolve, 300)
  );

  return `AI Draft:

${prompt.slice(0, 120)}...

(Placeholder AI response)`;
}