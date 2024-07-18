import { Form, useActionData } from '@remix-run/react';
import { unstable_defineAction as defineAction } from '@vercel/remix';
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { schema } from './api';

export const action = defineAction(async () => {
  return { message: 'Hello, world!' };
});

export default function Post() {
  const actionData = useActionData<typeof action>();
  const { submit, isLoading, error, object } = useObject({
    api: '/api',
    schema,
  });

  return (
    <div className="px-4 py-2">
      <h1>Vercel Remix Single Fetch Test</h1>

      <Form
        method="POST"
        onSubmit={(e) => {
          submit('');
        }}
      >
        <button className="mt-2 rounded-md bg-indigo-600 px-2.5 py-1.5 font-semibold text-white shadow-sm hover:bg-indigo-500">
          Submit
        </button>

        {actionData && (
          <div className="mt-2 border rounded p-2">{actionData.message}</div>
        )}

        {object && (
          <div>
            <div>{object.title}</div>
            <div>ingredients</div>
            <ul>
              {object.ingredients?.map((ingredient, index) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
            <div>steps</div>
            <ul>
              {object.steps?.map((step, index) => (
                <div key={step}>{step}</div>
              ))}
            </ul>
          </div>
        )}
      </Form>
    </div>
  );
}
