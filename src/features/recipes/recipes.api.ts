
import { api } from "@/lib/api";
import type { SavedRecipe, NewRecipe, RecipePatch } from "./recipes.types";

// Read all saved recipes.
export const getRecipes = async (): Promise<SavedRecipe[]> =>
  (await api.get<SavedRecipe[]>("/recipes")).data;

// Delete a recipe.
export const deleteRecipe = async (id: number): Promise<{ id: number }> => {
  await api.delete(`/recipes/${id}`);
  return { id };
};

// Create a new recipe.
export const createRecipe = async (
  recipe: NewRecipe
): Promise<SavedRecipe> => {
  const { data } = await api.post<SavedRecipe>("/recipes", recipe);
  return data;
};

// Update part of an existing recipe.
export const updateRecipe = async ({
  id,
  ...patch
}: RecipePatch): Promise<SavedRecipe> => {
  const { data } = await api.patch<SavedRecipe>(
    `/recipes/${id}`,
    patch
  );
  return data;
};
