
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "@/features/recipes/recipes.api";

import type { SavedRecipe } from "@/features/recipes/recipes.types";

const KEY = ["recipes"] as const;

export function useSavedRecipes() {
  const queryClient = useQueryClient();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: KEY });

  // Read saved recipes.
  const query = useQuery({
    queryKey: KEY,
    queryFn: getRecipes,
  });

  // Delete a recipe.
  const remove = useMutation({
    mutationFn: deleteRecipe,
    onSuccess: invalidate,
  });

  // Create a recipe.
  const create = useMutation({
    mutationFn: createRecipe,
    onSuccess: invalidate,
  });

  // Update a recipe.
  const update = useMutation({
    mutationFn: updateRecipe,
    onSuccess: invalidate,
  });

  // Favorite toggle (optimistic update will be implemented later).
  const favorite = useMutation({
    mutationFn: updateRecipe,
    onSettled: invalidate,
  });

  const saved = query.data ?? [];

  return {
    query,
    saved,
    savedMealIds: new Set(saved.map((r) => r.mealId)),
    favoriteCount: saved.filter((r) => r.favorite).length,
    create,
    update,
    remove,
    toggleFavorite: (recipe: SavedRecipe) =>
      favorite.mutate({
        id: recipe.id,
        favorite: !recipe.favorite,
      }),
  };
}
