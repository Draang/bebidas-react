import { openrouter } from "../lib/AI";
import { streamText } from "ai";
export async function generateRecipe(prompt: string) {
  const result = streamText({
    model: openrouter("meta-llama/llama-3.3-70b-instruct:free"),
    system:
      "You write simple, clear, and concise content." +
      "You are a professional bartender.",
    prompt,
  });
  return result.textStream;
}
