import type { PokemonListData } from "@/types/pokemon";

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  normal: { bg: "bg-gray-400/20", text: "text-gray-600 dark:text-gray-300", border: "border-gray-400/40" },
  fire: { bg: "bg-orange-500/10", text: "text-orange-600 dark:text-orange-400", border: "border-orange-500/30" },
  water: { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", border: "border-blue-500/30" },
  grass: { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500/30" },
  electric: { bg: "bg-amber-400/10", text: "text-amber-600 dark:text-amber-400", border: "border-amber-400/40" },
  ice: { bg: "bg-cyan-400/10", text: "text-cyan-600 dark:text-cyan-400", border: "border-cyan-400/40" },
  fighting: { bg: "bg-red-600/10", text: "text-red-600 dark:text-red-400", border: "border-red-600/30" },
  poison: { bg: "bg-purple-500/10", text: "text-purple-600 dark:text-purple-400", border: "border-purple-500/30" },
  ground: { bg: "bg-amber-600/10", text: "text-amber-700 dark:text-amber-500", border: "border-amber-600/30" },
  flying: { bg: "bg-indigo-400/10", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-400/40" },
  psychic: { bg: "bg-pink-500/10", text: "text-pink-600 dark:text-pink-400", border: "border-pink-500/30" },
  bug: { bg: "bg-lime-500/10", text: "text-lime-600 dark:text-lime-400", border: "border-lime-500/30" },
  rock: { bg: "bg-stone-500/10", text: "text-stone-600 dark:text-stone-400", border: "border-stone-500/30" },
  ghost: { bg: "bg-violet-600/10", text: "text-violet-600 dark:text-violet-400", border: "border-violet-600/30" },
  dragon: { bg: "bg-indigo-600/10", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-600/30" },
  steel: { bg: "bg-slate-400/20", text: "text-slate-600 dark:text-slate-300", border: "border-slate-400/40" },
  fairy: { bg: "bg-rose-400/10", text: "text-rose-600 dark:text-rose-400", border: "border-rose-400/40" },
};

interface PokemonCardProps {
  pokemon: PokemonListData;
  onSelect: (name: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
}

export default function PokemonCard({ pokemon, onSelect, isFavorite, onToggleFavorite }: PokemonCardProps) {
  const primaryType = pokemon.types[0] || "normal";
  const colors = typeColors[primaryType] || typeColors.normal;

  return (
    <div
      onClick={() => onSelect(pokemon.name)}
      className={`group relative p-4 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer flex flex-col items-center text-center h-full justify-between ${colors.bg} ${colors.border}`}
    >
      {/* Botón de favorito flotante */}
      <button
        onClick={onToggleFavorite}
        className="absolute top-2.5 right-2.5 text-base hover:scale-110 transition-transform cursor-pointer"
        title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      {/* Contenedor de la Imagen */}
      <div className="bg-background/40 dark:bg-background/20 p-2.5 rounded-full mb-3 w-24 h-24 flex items-center justify-center border border-border/30 group-hover:scale-105 transition-transform duration-300">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-20 h-20 object-contain drop-shadow"
          loading="lazy"
        />
      </div>

      {/* ID y Nombre */}
      <div className="space-y-1 w-full">
        <span className="text-[10px] font-mono text-muted-foreground block">
          #{String(pokemon.id).padStart(3, "0")}
        </span>
        <h3 className="font-extrabold capitalize text-sm tracking-tight text-foreground group-hover:text-primary transition-colors">
          {pokemon.name}
        </h3>
      </div>

      {/* Badges de Tipos Elementales Dinámicos */}
      <div className="flex gap-1.5 mt-3 justify-center w-full flex-wrap">
        {pokemon.types.map((type) => {
          const badgeColors = typeColors[type] || typeColors.normal;
          return (
            <span
              key={type}
              className={`px-2 py-0.5 text-[10px] font-bold rounded-full capitalize border shadow-xs ${badgeColors.bg} ${badgeColors.text} ${badgeColors.border}`}
            >
              {type}
            </span>
          );
        })}
      </div>
    </div>
  );
}