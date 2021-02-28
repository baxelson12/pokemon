import { createAction, props } from '@ngrx/store';
import { PokemonBase } from '../../core/interfaces/PokemonBase';

// Load base Pokemon
export const LOAD_POKEMON = '[Pokemon] Load pokemon.';
export const LOAD_POKEMON_FAIL = '[Pokemon] Load pokemon fail.';
export const LOAD_POKEMON_SUCCESS = '[Pokemon] Load pokemon success.';

export const loadPokemon = createAction(LOAD_POKEMON);
export const loadPokemonFail = createAction(LOAD_POKEMON_FAIL);
export const loadPokemonSuccess = createAction(
  LOAD_POKEMON_SUCCESS,
  props<{ pokemon: PokemonBase[] }>()
);

// Select Pokemon
export const SELECT_POKEMON = '[Pokemon] Select Pokemon.';
export const selectPokemon = createAction(
  SELECT_POKEMON,
  props<{ id: number }>()
);
// Deselect Pokemon
export const DESELECT_POKEMON = '[Pokemon] Deselect Pokemon.';
export const deselectPokemon = createAction(DESELECT_POKEMON);

// Sort by
export const SELECT_SORT = '[Pokemon] Change sort.';
export const selectSort = createAction(
  SELECT_SORT,
  props<{ sortBy: string }>()
);
