export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokeAPIResponse {
  results: PokemonListItem[];
}

export interface PokemonCardProps {
  name: string;
  url: string; 
}

// coperar el json 
// le abro la terminal de iot y le pongo el nombre del mas alto nivel(pokemon) y te crea los archivos 