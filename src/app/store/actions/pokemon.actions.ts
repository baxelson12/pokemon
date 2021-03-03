import { createAction, props } from '@ngrx/store';
import { PokemonBase } from '../../core/interfaces/PokemonBase';
import { SortBy } from '../../shared/types/sortBy';

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

// Incremental load
export const LOAD_POKEMON_INCREMENTAL = '[Pokemon] Load pokemon incrementally.';
export const LOAD_POKEMON_INCREMENTAL_FAIL =
  '[Pokemon] Load pokemon incrementally fail.';
export const LOAD_POKEMON_INCREMENTAL_SUCCESS =
  '[Pokemon] Load pokemon incrementally success.';
export const LOAD_POKEMON_INCREMENTAL_COMPLETE =
  '[Pokemon] Load pokemon incrementally complete.';
export const LOAD_POKEMON_INCREMENTAL_INCOMPLETE =
  '[Pokemon] Load pokemon incrementally incomplete.';

export const loadPokemonIncremental = createAction(LOAD_POKEMON_INCREMENTAL);
export const loadPokemonIncrementalFail = createAction(
  LOAD_POKEMON_INCREMENTAL_FAIL,
  props<{ pokemon: PokemonBase }>()
);
export const loadPokemonIncrementalSuccess = createAction(
  LOAD_POKEMON_INCREMENTAL_SUCCESS,
  props<{ pokemon: PokemonBase }>()
);
export const loadPokemonIncrementalComplete = createAction(
  LOAD_POKEMON_INCREMENTAL_COMPLETE
);
export const loadPokemonIncrementalIncomplete = createAction(
  LOAD_POKEMON_INCREMENTAL_INCOMPLETE
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

// Change sort
export const SORT_BY = '[Pokemon] Change sort.';
export const sortBy = createAction(SORT_BY, props<{ sortBy: SortBy }>());

// Query change
export const QUERY_BY = '[Pokemon] Change query.';
export const queryBy = createAction(QUERY_BY, props<{ query: string }>());
