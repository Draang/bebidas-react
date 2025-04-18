import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";
import type { FiltersRecipes } from "../types";

export default function Header() {
  const [searchFilters, setSearchFilters] = useState<FiltersRecipes>({
    ingredient: "",
    category: "",
  });
  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === "/", [pathname]);
  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const searchRecipies = useAppStore((state) => state.searchRecipies);
  const categories = useAppStore((state) => state.categories);
  useEffect(() => {
    fetchCategories();
  }, []);
  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void {
    const { name, value } = event.target;
    setSearchFilters({ ...searchFilters, [name]: value });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    //TODO : Validar
    if (Object.values(searchFilters).includes("")) {
      return;
    }
    //Consultar recetas
    searchRecipies(searchFilters);
  }

  return (
    <header
      className={
        isHome ? "bg-[url(/bg.jpg)] bg-center bg-cover" : "bg-slate-800"
      }
    >
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img src="/logo.svg" className="w-32" alt="icono" />
          </div>

          <nav className="flex gap-4">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                !isActive
                  ? "text-white uppercase font-bold"
                  : "text-orange-500 uppercase font-bold"
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to={"/favorites"}
              className={({ isActive }) =>
                !isActive
                  ? "text-white uppercase font-bold"
                  : "text-orange-500 uppercase font-bold"
              }
            >
              Favoritos
            </NavLink>
          </nav>
        </div>
        {isHome && (
          <form
            className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-10 p-10 rounded-lg space-y-3"
            onSubmit={handleSubmit}
          >
            <div className="space-y-2">
              <label
                htmlFor="ingredient"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Ingrendiente o nombre
              </label>
              <input
                type="text"
                name="ingredient"
                id="ingredient"
                className="p-3 rounded-lg focus:outline-none w-full bg-white"
                placeholder="ej. Vodka, Tequila, Cafe"
                value={searchFilters.ingredient}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Categoria
              </label>
              <select
                name="category"
                id="category"
                className="p-3 rounded-lg focus:outline-none w-full bg-white"
                value={searchFilters.category}
                onChange={handleChange}
              >
                <option value="">-- Seleccione --</option>
                {categories.drinks.map((category) => (
                  <option
                    key={category.strCategory}
                    value={category.strCategory}
                  >
                    {category.strCategory}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="submit"
              value="Buscar receta"
              className="cursor-pointer bg-orange-900 hover:bg-orange-700 rounded-lg uppercase w-full text-white font-black p-2 "
            />
          </form>
        )}
      </div>
    </header>
  );
}
