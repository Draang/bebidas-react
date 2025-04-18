import { useMemo } from "react";
import DrinkCard from "../components/DrinkCard";
import { useAppStore } from "../stores/useAppStore";

export default function FavoritesPage() {
  const favorites = useAppStore((state) => state.favorites);
  const hasFavorites = useMemo(() => favorites.length > 0, [favorites]);
  return (
    <>
      <h1 className=" text-6xl font-extrabold">Favoritos</h1>
      {hasFavorites ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-10 gap-10">
          {favorites.map((favorite) => (
            <DrinkCard drink={favorite} key={favorite.idDrink} />
          ))}
        </div>
      ) : (
        <>
          <p className="mt-10 text-center text-2xl">
            No hay favoritos aun vuelve a inicio para buscar
          </p>
        </>
      )}
    </>
  );
}
