import { useState, useEffect, useMemo } from "react";
import type { PokemonListData } from "@/types/pokemon";

interface UsePaginacionProps {
  lista: PokemonListData[];      
  porPagina?: number;            
  reiniciarCuando?: unknown[];   
}

export function Paginacion({
  lista,
  porPagina = 20,
  reiniciarCuando = [],
}: UsePaginacionProps) {
  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {
    setPaginaActual(1);
  }, reiniciarCuando); 

  const totalPaginas = Math.ceil(lista.length / porPagina);

  const bloquePagina = useMemo(() => {
    const inicio = (paginaActual - 1) * porPagina;
    const fin = inicio + porPagina;
    return lista.slice(inicio, fin);
  }, [lista, paginaActual, porPagina]);

  const irAPaginaAnterior = () =>
    setPaginaActual((prev) => Math.max(prev - 1, 1));

  const irAPaginaSiguiente = () =>
    setPaginaActual((prev) => Math.min(prev + 1, totalPaginas));

  return {
    paginaActual,
    totalPaginas,
    bloquePagina,
    irAPaginaAnterior,
    irAPaginaSiguiente,
  };
}