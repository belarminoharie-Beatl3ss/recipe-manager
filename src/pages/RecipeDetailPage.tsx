
import { Link, useParams } from "react-router-dom";
import { useMeal } from "@/features/meals/meals.hooks";

export default function RecipeDetailPage() {
  const { id = "" } = useParams();
  const meal = useMeal(id);

  if (meal.isLoading) {
    return (
      <div className="text-center py-12">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (meal.isError) {
    return (
      <div className="alert alert-error">
        Could not load this recipe. Please check your connection.
      </div>
    );
  }

  if (!meal.data) {
    return (
      <div className="text-center py-12 space-y-4">
        <h1 className="text-2xl font-bold">Recipe not found</h1>
        <p className="text-base-content/70">
          This meal may no longer be available.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to Search
        </Link>
      </div>
    );
  }

  const recipe = meal.data;

  return (
    <div className="space-y-6">
      <Link to="/" className="btn btn-ghost btn-sm">
        &larr; Back to Search
      </Link>

      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img
            src={recipe.thumb}
            alt={recipe.title}
            className="w-full max-h-96 object-cover"
          />
        </figure>

        <div className="card-body">
          <h1 className="card-title text-3xl">{recipe.title}</h1>

          <p className="text-base-content/60">
            Category: {recipe.category}
          </p>

          <div>
            <h2 className="text-xl font-bold mb-3">Ingredients</h2>

            <ul className="list-disc list-inside space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={`${ingredient}-${index}`}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
