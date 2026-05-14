import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';

import { Badge } from '../components/ui/badge'; 
import { Card, CardContent, CardHeader, CardTitle } from '../componentes/ui/card';

export default function DetallePoke() {
  const { name } = useParams(); 
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(data => setPokemon(data));
  }, [name]);

  if (!pokemon) return <div className="p-10 text-center font-bold">Cargando datos del Pokémon...</div>;

return (
    <div className="max-w-6xl mx-auto p-6 animate-in fade-in duration-500">
      <div className="w-full flex justify-start mb-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="hover:bg-slate-100">
          ← Volver a la lista
        </Button>
      </div>

      <header className="text-center mb-12">
        <h1 className="text-7xl md:text-7xl font-black capitalize text-slate-900 tracking-tighter mb-2">
          {pokemon.name}
        </h1>
        <Badge variant="outline" className="text-2xl font-mono text-slate-400 border-none">
          # {pokemon.id.toString().padStart(1, '0')}
        </Badge>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        <div className="flex flex-col items-center space-y-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-slate-100 rounded-full scale-110 -z-10 blur-2xl opacity-50"></div>
            <img 
              src={pokemon.sprites.other['official-artwork'].front_default} 
              alt={pokemon.name}
              className="w-full max-w-md drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex gap-3">
            {pokemon.types.map((t: any) => (
              <Badge key={t.type.name} className="capitalize px-6 py-2 text-lg font-bold shadow-sm">
                {t.type.name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          
          <Card className="border-none bg-slate-50/50 shadow-none">
            <CardContent className="grid grid-cols-2 gap-8 pt-6">
              <div className="space-y-1">
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Altura</p>
                <p className="text-2xl font-semibold text-slate-700">{pokemon.height / 10} m</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Peso</p>
                <p className="text-2xl font-semibold text-slate-700">{pokemon.weight / 10} kg</p>
              </div>
              <div className="col-span-2 space-y-2">
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Habilidades</p>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((a: any) => (
                    <Badge key={a.ability.name} variant="secondary" className="capitalize text-sm bg-white border-slate-200">
                      {a.ability.name.replace('-', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-slate-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <span className="w-2 h-6  rounded-full"></span>
                Estadísticas Base
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pokemon.stats.map((s: any) => (
                <div key={s.stat.name} className="group">
                  <div className="flex justify-between text-sm mb-1 px-1">
                    <span className="capitalize font-bold text-slate-500 group-hover:text-primary transition-colors">
                      {s.stat.name.replace('-', ' ')}
                    </span>
                    <span className="font-mono font-black text-slate-700">{s.base_stat}</span>
                  </div>
                  <div className="w-full bbg-blue-600 rounded-full h-3 overflow-hidden border border-slate-200/50">
                    <div 
                      className="bg-blue-900 h-full rounded-full"
                      style={{ width: `${Math.min((s.base_stat / 200) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
            
      </div>
      
    </div>
  );
}