import { useState } from "react";

export function Favoritos() {
  const [favorites, setFavorites] = useState<number[]>(() => {
    return JSON.parse(localStorage.getItem("poke_favorites") || "[]");
  });

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Evita disparar eventos de la tarjeta padre
    const updated = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];
    
    setFavorites(updated);
    localStorage.setItem("poke_favorites", JSON.stringify(updated));
  };

  return { favorites, toggleFavorite };
}