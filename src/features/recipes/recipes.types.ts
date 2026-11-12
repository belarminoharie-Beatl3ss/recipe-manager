import type { Recipe } from "@/features/meals/meals.types";

/** A recipe once it has been saved locally and assigned an id. */
export interface SavedRecipe extends Recipe {
  id: string;
}

/** What we send to create one: everything except the id. */
export type NewRecipe = Recipe;

/** A PATCH body: the id says which recipe to update. */
export type RecipePatch = { id: string } & Partial<Omit<SavedRecipe, "id">>;
