import { useAppStore } from "../stores/useAppStore";
import type { Drink } from "../types";

type DrinkCardProps = {
  drink: Drink;
};
export default function DrinkCard({ drink }: DrinkCardProps) {
  const selectRecipe = useAppStore(({ selectRecipe }) => selectRecipe);
  return (
    <div className="border-none shadow-lg rounded-md">
      <div className="overflow-hidden">
        <img
          src={drink.strDrinkThumb}
          alt={`imagen de ${drink.strDrink}`}
          className="hover:scale-125 transition-transform hover:rotate-2"
        />
      </div>
      <div className="p-5">
        <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>
        <button
          className="bg-orange-400 hover:bg-orange-500 mt-5 font-bold text-white w-full p-3 rounded-lg"
          onClick={() => selectRecipe(drink.idDrink)}
          type="button"
        >
          Receta
        </button>
      </div>
    </div>
  );
}
