import { z } from "zod";

export const bakingSchema = z.object({
  content: z.string().describe("Normal answer content."),
  afterCode: z.string().describe("Original unoptimized code snippet."),
  beforeCode: z.string().describe("Optimized code snippet."),
});
