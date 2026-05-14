import { useEffect, useState } from "react";
import { getPokemonList } from "../servicios/pokemonServicio";
import type { PokemonListItem } from "../types/Interfases";
import { PokemonCard } from "../componentes/Tarjeta";

function ListaPokemon(){
    const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const loadData = async () => {
          try {
            const data = await getPokemonList(20);
            setPokemons(data);
          } catch (error) {
            console.error("Error al cargar:", error);
          } finally {
            setLoading(false);
          }
        };
        loadData();
      }, []);
    
      if (loading) return <div className="p-10 text-center">Cargando Pokédex...</div>;
    return(
    <main className="container mx-auto py-10 px-4">
          <h1 className="text-4xl font-extrabold text-center mb-10 text-slate-900">Pokedex </h1>
    
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pokemons.map((pokemon) => (
              <PokemonCard  key={pokemon.name} name={pokemon.name} url={pokemon.url} 
              />
            ))}
          </div>
        </main>);
}

export default ListaPokemon;
