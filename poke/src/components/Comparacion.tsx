import { Button } from "@/components/ui/button";
import type { PokemonDetail } from "@/types/pokemon";
import { BarChart2, Trophy } from "lucide-react"; 


interface ComparePanelProps {
  compareDetails: PokemonDetail[];
  onClear: () => void;
}

export default function Comparacion({ compareDetails, onClear }: ComparePanelProps) {
  if (compareDetails.length === 0) return null;

  const getHighestStat = (statName: string) => {
    if (compareDetails.length < 2) return 0;
    const statA = compareDetails[0].stats.find(s => s.stat.name === statName)?.base_stat || 0;
    const statB = compareDetails[1].stats.find(s => s.stat.name === statName)?.base_stat || 0;
    return Math.max(statA, statB);
  };

  const getStatDifference = (currentStat: number, statName: string, index: number) => {
    if (compareDetails.length < 2) return null;
    const otherIndex = index === 0 ? 1 : 0;
    const otherStat = compareDetails[otherIndex].stats.find(s => s.stat.name === statName)?.base_stat || 0;
    
    const diff = currentStat - otherStat;
    if (diff > 0) return `(+${diff})`; // Si es ganador, muestra cuánto le lleva de ventaja
    return null;
  };

  return (
    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5 space-y-4 animate-in fade-in duration-300">
      <div className="flex justify-between items-center border-b border-amber-500/20 pb-2">
        <div className="flex items-center gap-2 font-bold text-amber-600 dark:text-amber-400">
          <BarChart2 className="w-5 h-5" />
          <h3>Comparador de Estadísticas Cara a Cara ({compareDetails.length}/2)</h3>
        </div>
        <Button size="sm" variant="ghost" onClick={onClear} className="text-xs hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 cursor-pointer">
          Limpiar Panel
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {compareDetails.map((poke, index) => (
          <div key={poke.id} className="bg-card p-4 rounded-lg border border-border flex flex-col sm:flex-row items-center gap-4 relative">
            <img src={poke.sprites.other['official-artwork'].front_default} className="w-20 h-20 object-contain" alt={poke.name} />
            <div className="flex-1 w-full">
              <h4 className="font-extrabold capitalize text-base border-b pb-1 mb-2 text-primary">
                #{String(poke.id).padStart(3, '0')} {poke.name}
              </h4>
              <div className="text-xs space-y-1.5">
                {poke.stats.map(s => {
                  const highestValue = getHighestStat(s.stat.name);
                  const isWinner = compareDetails.length === 2 && s.base_stat === highestValue && s.base_stat !== 0;
                  const differenceText = getStatDifference(s.base_stat, s.stat.name, index);

                  return (
                    <div key={s.stat.name} className="space-y-0.5">
                      <div className="flex justify-between font-medium capitalize">
                        <span className="text-muted-foreground flex items-center gap-1">
                          {s.stat.name}
                          {isWinner && <Trophy className="w-3 h-3 text-emerald-500 inline" />} {/* Icono de trofeo al ganador */}
                        </span>
                        <span className="font-mono font-bold text-foreground">
                          {s.base_stat} <span className="text-emerald-500 font-extrabold text-[10px]">{differenceText}</span>
                        </span>
                      </div>
                      <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                        <div 
                         
                          className={`h-full rounded-full transition-all duration-300 ${
                            isWinner ? "bg-emerald-500" : "bg-amber-500"
                          }`} 
                          style={{ width: `${Math.min((s.base_stat / 160) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}