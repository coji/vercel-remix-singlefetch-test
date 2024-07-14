import { type MetaFunction } from '@vercel/remix';
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { schema } from './api';

export const meta: MetaFunction = () => {
  return [
    { title: 'Recipi Generator' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  const { submit, object, isLoading } = useObject({
    schema,
    api: '/api',
  });
  return (
    <div className="font-sans p-4 bg-slate-100 min-h-dvh">
      <h1 className="text-3xl">Recipi Generator</h1>

      <form
        className="overflow-hidden rounded-lg bg-white shadow px-4 py-5"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const name = formData.get('name');
          submit({ name: name ? name.toString() : 'Lasagna' });
        }}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name of dish.</label>
          <input
            name="name"
            placeholder="e.g. Lasagna"
            className="w-full p-2 border rounded-md"
          />
          <button
            className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
            disabled={isLoading}
          >
            Generate Recipe
          </button>
        </div>

        {object?.recipe && (
          <div className="flex flex-col gap-2">
            <div className="mt-4 font-bold">{object.recipe.name}</div>
            {object.recipe.ingredients && (
              <div>
                <div className="text-slate-500">Ingredients</div>
                <ul className="list-disc list-inside">
                  {object.recipe.ingredients.map((ingredient, index) => (
                    <li key={`${index}_${ingredient}`}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}

            {object.recipe.steps && (
              <div>
                <div className="text-slate-500">Steps</div>
                <ul className="list-disc list-inside">
                  {object.recipe.steps.map((step, index) => (
                    <li key={`${index}_${step}`}>{step}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
