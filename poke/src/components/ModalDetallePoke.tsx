import { Button } from "@/components/ui/button";
import type { PokemonDetail } from "@/types/pokemon";


interface PokemonDetailModalProps {
  pokemon: PokemonDetail | null;
  onClose: () => void;
}

export default function ModalDetallePoke({ pokemon, onClose }: PokemonDetailModalProps) {
  if (!pokemon) return null;

  return (

    <div 
      className="fixed inset-0 bg-black/70 z-50 flex justify-end backdrop-blur-xs transition-opacity animate-in fade-in duration-200" 
      onClick={onClose}
    >
      {/*  EL CONTENEDOR PRINCIPAL */}
      <div 
        className="w-full max-w-md bg-card text-card-foreground h-full p-6 shadow-2xl overflow-y-auto space-y-6 animate-in slide-in-from-right duration-300 flex flex-col justify-between border-l border-border" 
        onClick={e => e.stopPropagation()}
      >
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-sm font-mono text-muted-foreground bg-muted px-2.5 py-1 rounded-md">
              #{String(pokemon.id).padStart(3, '0')}
            </span>
            <Button variant="ghost" size="sm" onClick={onClose} className="cursor-pointer hover:bg-muted text-foreground rounded-full">
              Cerrar ✕
            </Button>
          </div>

          <div className="flex flex-col items-center text-center">
            {/* Contenedor circular interno para la foto */}
            <div className="bg-muted/40 p-4 rounded-full border border-border/40 mb-2 w-48 h-48 flex items-center justify-center">
              <img 
                src={pokemon.sprites.other['official-artwork'].front_default} 
                alt={pokemon.name}
                className="w-40 h-40 object-contain drop-shadow-md"
              />
            </div>
            <h2 className="text-3xl font-black capitalize tracking-tight text-foreground">{pokemon.name}</h2>
            
            <div className="flex gap-2 mt-2">
              {pokemon.types.map(t => (
                <span key={t.type.name} className="px-3 py-0.5 bg-primary text-primary-foreground font-bold rounded-full capitalize text-xs shadow-xs">
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>

          {/* Caja física de Peso y Altura */}
          <div className="grid grid-cols-2 gap-4 bg-background p-4 rounded-xl border border-border text-center shadow-inner">
            <div>
              <span className="text-[10px] text-muted-foreground block font-bold tracking-wider">PESO</span>
              <span className="font-extrabold text-lg text-foreground">{(pokemon.weight / 10)} kg</span>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground block font-bold tracking-wider">ALTURA</span>
              <span className="font-extrabold text-lg text-foreground">{(pokemon.height / 10)} m</span>
            </div>
          </div>

          {/* Sección de Habilidades */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-muted-foreground tracking-wide uppercase">Habilidades</h4>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map(a => (
                <span key={a.ability.name} className="text-xs bg-muted text-foreground border border-border px-3 py-1 rounded-lg font-medium capitalize">
                  {a.ability.name}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-sm text-muted-foreground tracking-wide uppercase">Estadísticas Base</h4>
            <div className="space-y-2.5">
              {pokemon.stats.map(s => (
                <div key={s.stat.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold capitalize">
                    <span className="text-muted-foreground">{s.stat.name}</span>
                    <span className="font-mono font-bold text-foreground">{s.base_stat}</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-red-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min((s.base_stat / 160) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="text-center pt-4 border-t border-border">
          <p className="text-[10px] text-muted-foreground font-mono">Pokédex Indexing System V4</p>
        </footer>

      </div>
    </div>
  );
}