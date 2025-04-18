import axios from "axios";
import {
  CategoriesAPIRes,
  DrinksAPIRes,
  RecipeAPIResponseSchema,
} from "../utils/recipes-schemas";
import { FiltersRecipes } from "../types";

export async function getCategories() {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
  const { data } = await axios(url);
  const res = CategoriesAPIRes.safeParse(data);
  if (res.success) return res.data;
}
export async function getRecipes(filters: FiltersRecipes) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filters.ingredient}&c=${filters.category}`;
  const { data } = await axios(url);
  const res = DrinksAPIRes.safeParse(data);
  if (res.success) return res.data;
}
export async function getFullRecipe(id: string) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { data } = await axios(url);
  const res = RecipeAPIResponseSchema.safeParse(data.drinks[0]);
  if (res.success) return res.data;
}
