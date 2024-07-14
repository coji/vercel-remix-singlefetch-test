import { unstable_defineAction as defineAction } from '@vercel/remix';
import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { z } from 'zod';

export const schema = z.object({
  recipe: z.object({
    name: z.string(),
    ingredients: z.array(z.string()),
    steps: z.array(z.string()),
  }),
});

export const action = defineAction(async ({ request }) => {
  const input = await request.json();
  const { name } = z
    .object({
      name: z.string(),
    })
    .parse(input);

  const result = await streamObject({
    model: openai('gpt-3.5-turbo'),
    schema,
    prompt: `Generate a ${name} recipe.`,
  });

  return result.toTextStreamResponse();
});
