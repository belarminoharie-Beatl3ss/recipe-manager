
import { mealdb } from "@/lib/api";
import type {
  Meal,
  Recipe,
  SearchResponse,
  CategoriesResponse,
} from "./meals.types";

// Convert TheMealDB data into our Recipe format.
export function toRecipe(meal: Meal): Recipe {
  const ingredients = Array.from({ length: 20 }, (_, index) =>
    meal[`strIngredient${index + 1}`]
  ).filter((x): x is string => Boolean(x && x.trim()));

  return {
    mealId: meal.idMeal,
    title: meal.strMeal,
    category: meal.strCategory,
    thumb: meal.strMealThumb,
    ingredients,
    time: 0,
    notes: "",
    favorite: false,
  };
}

// Search TheMealDB for recipes.
export async function searchMeals(query: string): Promise<Recipe[]> {
  const { data } = await mealdb.get<SearchResponse>("/search.php", {
    params: { s: query },
  });

  return (data.meals ?? []).map(toRecipe);
}

// Retrieve TheMealDB categories.
export async function getCategories(): Promise<string[]> {
  const { data } = await mealdb.get<CategoriesResponse>("/categories.php");

  return (data.categories ?? []).map(
    (category) => category.strCategory
  );
}

// Retrieve one meal by its TheMealDB ID.
export async function getMealById(id: string): Promise<Recipe | null> {
  const { data } = await mealdb.get<SearchResponse>("/lookup.php", {
    params: { i: id },
  });

  const meal = data.meals?.[0];

  return meal ? toRecipe(meal) : null;
}
