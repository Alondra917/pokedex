import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Filtrar } from "@/hooks/Filtrar";
import type { PokemonListData } from "@/types/pokemon";

// Datos de prueba que simulan la lista real
const mockPokemon: PokemonListData[] = [
  { id: 1,   name: "bulbasaur",  image: "", types: ["grass", "poison"] },
  { id: 4,   name: "charmander", image: "", types: ["fire"] },
  { id: 7,   name: "squirtle",   image: "", types: ["water"] },
  { id: 25,  name: "pikachu",    image: "", types: ["electric"] },
  { id: 6,   name: "charizard",  image: "", types: ["fire", "flying"] },
];

const mockFavoritos = [1, 25]; // bulbasaur y pikachu en favoritos

describe("useFiltro", () => {

  // Busqueda 

  it("devuelve todos los pokemon cuando la búsqueda esta vacia", () => {
    const { result } = renderHook(() =>
      Filtrar({ todos: mockPokemon, favoritos: mockFavoritos })
    );

    expect(result.current.pokemonFiltrados).toHaveLength(5);
  });

  it("filtra por nombre correctamente", () => {
    const { result } = renderHook(() =>
      Filtrar({ todos: mockPokemon, favoritos: mockFavoritos })
    );

    act(() => result.current.setBusqueda("CHAR"));

    // Debe devolver charmander y charizard
    expect(result.current.pokemonFiltrados).toHaveLength(2);
    expect(result.current.pokemonFiltrados.map(p => p.name)).toEqual(
      expect.arrayContaining(["charmander", "charizard"])
    );
  });

  it("devuelve array vacio si la busqueda no coincide con ningun pokemon", () => {
    const { result } = renderHook(() =>
      Filtrar({ todos: mockPokemon, favoritos: mockFavoritos })
    );

    act(() => result.current.setBusqueda("mewtwo"));

    expect(result.current.pokemonFiltrados).toHaveLength(0);
  });

  //Filtro por tipo 

  it("filtra por tipo correctamente", () => {
    const { result } = renderHook(() =>
      Filtrar({ todos: mockPokemon, favoritos: mockFavoritos })
    );

    act(() => result.current.setTipoSeleccionado("fire"));

    // Debe devolver charmander y charizard
    expect(result.current.pokemonFiltrados).toHaveLength(2);
    expect(result.current.pokemonFiltrados.map(p => p.name)).toEqual(
      expect.arrayContaining(["charmander", "charizard"])
    );
  });

  it("devuelve todos cuando el tipo seleccionado es cadena vacia", () => {
    const { result } = renderHook(() =>
      Filtrar({ todos: mockPokemon, favoritos: mockFavoritos })
    );

    act(() => result.current.setTipoSeleccionado(""));

    expect(result.current.pokemonFiltrados).toHaveLength(5);
  });

  it("devuelve pokemon con multiples tipos cuando uno de ellos coincide", () => {
    const { result } = renderHook(() =>
      Filtrar({ todos: mockPokemon, favoritos: mockFavoritos })
    );

    // bulbasaur tiene ["grass", "poison"] — filtrar por "poison" debe encontrarlo
    act(() => result.current.setTipoSeleccionado("poison"));

    expect(result.current.pokemonFiltrados).toHaveLength(1);
    expect(result.current.pokemonFiltrados[0].name).toBe("bulbasaur");
  });

  // ── Favoritos ─────────────────────────────────────────────────────────────

  it("filtra solo favoritos cuando tipoSeleccionado es 'fav'", () => {
    const { result } = renderHook(() =>
      Filtrar({ todos: mockPokemon, favoritos: mockFavoritos })
    );

    act(() => result.current.setTipoSeleccionado("fav"));

    // Solo bulbasaur  y pikachu  son favoritos
    expect(result.current.pokemonFiltrados).toHaveLength(2);
    expect(result.current.pokemonFiltrados.map(p => p.name)).toEqual(
      expect.arrayContaining(["bulbasaur", "pikachu"])
    );
  });

  it("devuelve array vacio si no hay favoritos guardados", () => {
    const { result } = renderHook(() =>
      Filtrar({ todos: mockPokemon, favoritos: [] }) // sin favoritos
    );

    act(() => result.current.setTipoSeleccionado("fav"));

    expect(result.current.pokemonFiltrados).toHaveLength(0);
  });

});