import type { PokeAPIResponse, PokemonListItem } from "../types/Interfases";

export const getPokemonList = async (limit: number = 20): Promise<PokemonListItem[]> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const data: PokeAPIResponse = await response.json();
  return data.results;
};