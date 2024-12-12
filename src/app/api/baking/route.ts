import { createOpenAI } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { bakingSchema } from "./schema";
import { env } from "@/env";
import { bakingPrompt } from "@/lib/prompt";

export const maxDuration = 60;

const openaiInstance = createOpenAI({
  baseURL: env.OPENAI_BASE_URL,
  apiKey: env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const context = await req.json();

  const result = streamObject({
    model: openaiInstance.chat("gpt-4"),
    schema: bakingSchema,
    prompt: `${bakingPrompt} ${context}`,
    maxTokens: 6000,
  });

  return result.toTextStreamResponse();
}
