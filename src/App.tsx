import { useEffect, useState } from 'react';
import type { PokemonListItem } from "./types/Interfases";
import { getPokemonList } from './servicios/pokemonServicio';


function App() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await getPokemonList(20);
      setPokemons(data);
    };

    loadData();
  }, []); 

  return (
    <div className="pokedex-container">
      <h1>PokeAPI </h1>
      <div className="grid">
        {pokemons.map((pokemon) => {
          const id = pokemon.url.split('/').filter(Boolean).pop();
          return (
            <div key={id} className="card">
              <img 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} 
                alt={pokemon.name} 
              />
              <p>{pokemon.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;