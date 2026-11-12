
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

  // Optimistic favorite update.
  const favorite = useMutation({
    mutationFn: updateRecipe,

    // Update the cache before the server responds.
    onMutate: async ({ id, favorite: newFavorite }) => {
      await queryClient.cancelQueries({ queryKey: KEY });

      // Save the previous data for rollback.
      const previous = queryClient.getQueryData<SavedRecipe[]>(KEY);

      // Ensure the favorite value is always a boolean.
      const favoriteValue = Boolean(newFavorite);

      // Update the matching recipe immediately.
      queryClient.setQueryData<SavedRecipe[]>(
        KEY,
        (old) =>
          old?.map((recipe) =>
            recipe.id === id
              ? { ...recipe, favorite: favoriteValue }
              : recipe
          )
      );

      return { previous };
    },

    // Restore the old data if the request fails.
    onError: (_error, _variables, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(KEY, context.previous);
      }
    },

    // Refresh the cache after success or failure.
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
