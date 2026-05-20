import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Search, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { pokemonService } from "./services/pokemonService";
import { ModoOscuro } from "./hooks/ModoOscuro";
import { Favoritos } from "./hooks/Favoritos";

import type { PokemonDetail, PokemonListData } from "./types/pokemon";
import Comparacion from "./components/Comparacion";
import PokemonCard from "./components/PokemonCard";
import ModalDetallePoke from "./components/ModalDetallePoke";
import { Filtrar } from "./hooks/Filtrar";
import { Comparar } from "./hooks/Comparar";
import { Paginacion } from "./hooks/Paginacion";

export default function App() {
  // ── Hooks de UI global ────────────────────────────────────────────────────
  const { theme, toggleTheme } = ModoOscuro();
  const { favorites, toggleFavorite } = Favoritos();

  // ── Estado de carga y datos base ──────────────────────────────────────────
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [todosLosPokemon, setTodosLosPokemon] = useState<PokemonListData[]>([]);
  const [tipos, setTipos] = useState<string[]>([]);

  // ── Modal de detalle ──────────────────────────────────────────────────────
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState<PokemonDetail | null>(null);

  // ── Hooks  ──────────────────────────────────────────────
  const {
    busqueda,
    setBusqueda,
    tipoSeleccionado,
    setTipoSeleccionado,
    pokemonFiltrados,
  } = Filtrar({ todos: todosLosPokemon, favoritos: favorites });

  const {
    idsComparacion,
    detallesComparacion,
    agregarAComparacion,
    limpiarComparacion,
  } = Comparar();

  const {
    paginaActual,
    totalPaginas,
    bloquePagina,
    irAPaginaAnterior,
    irAPaginaSiguiente,
  } = Paginacion({
    lista: pokemonFiltrados,
    porPagina: 20,
    reiniciarCuando: [busqueda, tipoSeleccionado],
  });

  // ── Carga inicial ─────────────────────────────────────────────────────────
  useEffect(() => {
    async function inicializar() {
      try {
        setCargando(true);
        setError(null);
        const lista = await pokemonService.getPokemonList(151);
        const listaTipos = await pokemonService.getTypes();
        setTodosLosPokemon(lista);
        setTipos(listaTipos);
      } catch {
        setError("No se pudieron cargar los datos desde el servidor proxy.");
      } finally {
        setCargando(false);
      }
    }
    inicializar();
  }, []);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSeleccionarPokemon = async (nombre: string) => {
    try {
      const detalle = await pokemonService.getPokemonDetail(nombre);
      setPokemonSeleccionado(detalle);
    } catch {
      alert("Error al cargar los detalles del Pokémon");
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">

      {/* NAVBAR */}
      <header className="border-b border-border sticky top-0 bg-background/90 backdrop-blur z-40 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-extrabold tracking-tight text-blue-500">POKEDEX</h1>
        <Button variant="outline" size="icon" onClick={toggleTheme} className="cursor-pointer">
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto p-6 space-y-6">

        {/* FILTROS */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-lg bg-background text-foreground placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary border-border"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <select
              value={tipoSeleccionado === "fav" ? "" : tipoSeleccionado}
              onChange={(e) => setTipoSeleccionado(e.target.value)}
              className="h-10 px-3 border rounded-lg bg-background border-border text-foreground text-sm capitalize outline-none cursor-pointer font-medium w-full sm:w-40"
            >
              <option value="" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">
                Todos los tipos
              </option>
              {tipos.map((t) => (
                <option key={t} value={t} className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900 capitalize">
                  {t}
                </option>
              ))}
            </select>

            {tipoSeleccionado === "fav" ? (
              <Button
                variant="outline"
                onClick={() => setTipoSeleccionado("")}
                className="h-10 text-sm shrink-0 cursor-pointer flex items-center justify-center gap-1 font-semibold w-full sm:w-44"
              >
                Listado
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => setTipoSeleccionado("fav")}
                className="h-10 text-sm shrink-0 cursor-pointer flex items-center justify-center gap-1 font-semibold w-full sm:w-44"
              >
                ❤️ Ver Favoritos ({favorites.length})
              </Button>
            )}
          </div>
        </div>

        {/* COMPARACIÓN */}
        <Comparacion
          compareDetails={detallesComparacion}
          onClear={limpiarComparacion}
        />

        {/* ESTADOS DE CARGA Y ERROR */}
        {cargando && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 className="h-10 w-10 animate-spin text-red-500" />
            <p className="text-muted-foreground text-sm font-medium">Conectando al Servidor Proxy...</p>
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 text-destructive border border-destructive/20 p-5 rounded-xl text-center font-medium max-w-md mx-auto">
            {error}
          </div>
        )}

        {!cargando && !error && (
          <>
            {pokemonFiltrados.length === 0 && (
              <div className="text-center py-16 bg-card border border-border rounded-xl w-full">
                <p className="text-muted-foreground font-medium text-sm">No se encontraron criaturas.</p>
              </div>
            )}

            {/* GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {bloquePagina.map((poke) => (
                <div key={poke.id} className="flex flex-col gap-2 bg-card p-1 border border-border/40 rounded-xl shadow-sm">
                  <PokemonCard
                    pokemon={poke}
                    onSelect={handleSeleccionarPokemon}
                    isFavorite={favorites.includes(poke.id)}
                    onToggleFavorite={(e) => toggleFavorite(poke.id, e)}
                  />
                  <Button
                    size="sm"
                    variant={idsComparacion.includes(poke.id) ? "destructive" : "secondary"}
                    onClick={() => agregarAComparacion(poke.id)}
                    className="text-xs mx-3 mb-2 cursor-pointer font-medium"
                  >
                    {idsComparacion.includes(poke.id) ? "Quitar Comparación" : "⚖️ Comparar"}
                  </Button>
                </div>
              ))}
            </div>

            {/* PAGINACIÓN */}
            {totalPaginas > 1 && (
              <div className="flex items-center justify-center gap-4 pt-6 border-t border-border mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={irAPaginaAnterior}
                  disabled={paginaActual === 1}
                  className="cursor-pointer gap-1"
                >
                  <ChevronLeft className="h-4 w-4" /> Anterior
                </Button>

                <span className="text-xs font-semibold text-muted-foreground">
                  Página <span className="text-foreground font-bold">{paginaActual}</span> de {totalPaginas}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={irAPaginaSiguiente}
                  disabled={paginaActual === totalPaginas}
                  className="cursor-pointer gap-1"
                >
                  Siguiente <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </main>

      <ModalDetallePoke
        pokemon={pokemonSeleccionado}
        onClose={() => setPokemonSeleccionado(null)}
      />
    </div>
  );
}