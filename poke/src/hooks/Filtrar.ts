import { useState,  useMemo } from "react";
import type { PokemonListData } from "@/types/pokemon";

interface UseFiltroProps {
  todos: PokemonListData[];
  favoritos: number[];
}

export function Filtrar({ todos, favoritos }: UseFiltroProps) {
  const [busqueda, setBusqueda] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");

  // Filtra la lista completa según búsqueda, tipo y favoritos
  const pokemonFiltrados = useMemo(() => {
    return todos.filter((poke) => {
      const coincideBusqueda = poke.name
        .toLowerCase()
        .includes(busqueda.toLowerCase());

      const coincideTipo =
        tipoSeleccionado === "" ||
        tipoSeleccionado === "fav" ||
        poke.types.includes(tipoSeleccionado);

      const coincideFavorito =
        tipoSeleccionado !== "fav" || favoritos.includes(poke.id);

      return coincideBusqueda && coincideTipo && coincideFavorito;
    });
  }, [todos, favoritos, busqueda, tipoSeleccionado]);

  return {
    busqueda,
    setBusqueda,
    tipoSeleccionado,
    setTipoSeleccionado,
    pokemonFiltrados,
  };
}