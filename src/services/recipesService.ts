import {
  CategoriesAPIRes,
  DrinksAPIRes,
  RecipeAPIResponseSchema,
} from "../utils/recipes-schemas";
import { FiltersRecipes } from "../types";
import { api } from "../lib/axios";

export async function getCategories() {
  const url = "/list.php?c=list";
  const { data } = await api(url);
  const res = CategoriesAPIRes.safeParse(data);
  if (res.success) return res.data;
}
export async function getRecipes(filters: FiltersRecipes) {
  const url = `filter.php?i=${filters.ingredient}&c=${filters.category}`;
  const { data } = await api(url);
  const res = DrinksAPIRes.safeParse(data);
  if (res.success) return res.data;
}
export async function getFullRecipe(id: string) {
  const url = `lookup.php?i=${id}`;
  const { data } = await api(url);
  const res = RecipeAPIResponseSchema.safeParse(data.drinks[0]);
  if (res.success) return res.data;
}
