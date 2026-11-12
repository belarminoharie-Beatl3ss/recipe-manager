
import { useQuery } from "@tanstack/react-query";
import {
  searchMeals,
  getCategories,
  getMealById,
} from "@/features/meals/meals.api";

// Search TheMealDB for recipes.
export function useSearchMeals(term: string) {
  return useQuery({
    queryKey: ["meals", term],
    queryFn: () => searchMeals(term),
    enabled: term.length > 0,
  });
}

// Retrieve the available recipe categories.
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}

// Retrieve one meal by its TheMealDB ID.
export function useMeal(id: string) {
  return useQuery({
    queryKey: ["meal", id],
    queryFn: () => getMealById(id),
    enabled: id.length > 0,
  });
}
