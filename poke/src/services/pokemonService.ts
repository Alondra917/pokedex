import type { PokemonDetail } from "@/types/pokemon";


const BASE_URL = 'http://localhost:3000/pokemon';

export const pokemonService = {
  async getPokemonList(limit = 151, offset = 0) {
    const res = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`);
    if (!res.ok) throw new Error('Error al obtener el listado desde el proxy');
    return res.json(); 
  },

  async getPokemonDetail(nameOrId: string | number): Promise<PokemonDetail> {
    const res = await fetch(`${BASE_URL}/${String(nameOrId).toLowerCase()}`);
    if (!res.ok) throw new Error('Pokémon no encontrado');
    return res.json();
  },

  async getTypes() {
    const res = await fetch(`${BASE_URL}/types`);
    if (!res.ok) throw new Error('Error al obtener los tipos');
    return res.json();
  }
};