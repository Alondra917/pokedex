import { useState } from "react";
import { pokemonService } from "@/services/pokemonService";
import type { PokemonDetail } from "@/types/pokemon";

export function Comparar() {
  const [idsComparacion, setIdsComparacion] = useState<number[]>([]);
  const [detallesComparacion, setDetallesComparacion] = useState<PokemonDetail[]>([]);

  const agregarAComparacion = async (id: number) => {
    if (idsComparacion.includes(id)) {
      setIdsComparacion(idsComparacion.filter((cId) => cId !== id));
      setDetallesComparacion(detallesComparacion.filter((p) => p.id !== id));
      return;
    }

    // Máximo 2 pokémon
    if (idsComparacion.length >= 2) {
      alert("Solo puedes comparar un máximo de 2 Pokémon simultáneamente.");
      return;
    }

    try {
      const detalle = await pokemonService.getPokemonDetail(id);
      setIdsComparacion([...idsComparacion, id]);
      setDetallesComparacion([...detallesComparacion, detalle]);
    } catch {
      alert("Error al cargar los datos para la comparación");
    }
  };

  const limpiarComparacion = () => {
    setIdsComparacion([]);
    setDetallesComparacion([]);
  };

  return {
    idsComparacion,
    detallesComparacion,
    agregarAComparacion,
    limpiarComparacion,
  };
}