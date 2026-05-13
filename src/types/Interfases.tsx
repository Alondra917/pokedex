export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokeAPIResponse {
  results: PokemonListItem[];
}