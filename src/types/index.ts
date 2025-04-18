import { z } from "zod";
import {
  CategoriesAPIRes,
  DrinkAPIResponse,
  DrinksAPIRes,
  RecipeAPIResponseSchema,
} from "../utils/recipes-schemas";

export type Categories = z.infer<typeof CategoriesAPIRes>;
export type FiltersRecipes = {
  ingredient: string;
  category: string;
};
export type Drinks = z.infer<typeof DrinksAPIRes>;
export type Drink = z.infer<typeof DrinkAPIResponse>;
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>;
