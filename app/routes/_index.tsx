import { Form, useActionData } from '@remix-run/react';
import { unstable_defineAction as defineAction } from '@vercel/remix';

export const action = defineAction(async () => {
  return { message: 'Hello, world!' };
});

export default function Post() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="font-sans px-4 py-2 bg-slate-100 min-h-dvh">
      <h1 className="text-2xl font-bold">Vercel Remix Single Fetch Test</h1>

      <Form method="POST" className="mt-4 rounded-lg bg-white shadow px-4 py-5">
        <button className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400">
          Submit
        </button>

        {actionData && (
          <div>
            <div className="text-slate-500">action data</div>
            <div className="border rounded-md p-4">{actionData.message}</div>
          </div>
        )}
      </Form>
    </div>
  );
}
