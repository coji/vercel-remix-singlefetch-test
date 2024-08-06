import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { unstable_defineAction as defineAction } from '@remix-run/node';
import { z } from 'zod';

// レシピのスキーマ
export const schema = z.object({
  title: z.string(),
  ingredients: z.array(z.string()),
  steps: z.array(z.string()),
});

export const action = defineAction(async () => {
  const result = await streamObject({
    model: openai('gpt-4o'),
    schema,
    prompt: 'Generate a lasagna recipe',
  });
  return result.toTextStreamResponse();
});
