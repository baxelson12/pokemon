import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { PokemonBase } from '../../core/interfaces/PokemonBase';
import * as PokemonActions from '../actions/pokemon.actions';
import { SortAscending, SortDescending } from '../../shared/utils/sort';

// Base model
export interface State extends EntityState<PokemonBase> {
  selectedPokemonId: number | null;
  loading: null[];
  loaded: boolean;
  sortBy: string;
  query: string;
}

// Get selected pokemon ID
export function selectPokemonId(p: PokemonBase): number {
  return p.id;
}

// Default sort by
export function sortIdAsc(a: PokemonBase, b: PokemonBase): number {
  return SortAscending(a.id, b.id);
}

// Generate adapter
export const adapter: EntityAdapter<PokemonBase> = createEntityAdapter<PokemonBase>(
  {
    selectId: selectPokemonId,
    sortComparer: sortIdAsc
  }
);

// Initial state
export const initial: State = adapter.getInitialState({
  selectedPokemonId: null,
  sortBy: 'idAsc',
  query: '',
  loading: [],
  loaded: false
});

export const pokemonReducer = createReducer(
  // Initial state
  initial,
  // Begin load
  on(PokemonActions.loadPokemon, (state) => ({
    ...state,
    loading: [].constructor(20)
  })),
  // Loading failed
  on(PokemonActions.loadPokemonFail, (state) => ({ ...state, loading: [] })),
  // Loaded
  on(PokemonActions.loadPokemonSuccess, (state, { pokemon }) =>
    adapter.setAll(pokemon, { ...state, loaded: true, loading: [] })
  ),
  // Begin incremental load
  on(PokemonActions.loadPokemonIncremental, (state) => ({
    ...state,
    loading: [].constructor(1)
  })),
  // Add one increment
  on(PokemonActions.loadPokemonIncrementalSuccess, (state, { pokemon }) =>
    adapter.addOne(pokemon, state)
  ),
  // Incremental load complete
  on(PokemonActions.loadPokemonIncrementalComplete, (state) => ({
    ...state,
    loading: [],
    loaded: true
  })),
  // Incremental load fail
  on(PokemonActions.loadPokemonIncrementalFail, (state) => ({ ...state })),
  // Incremental load incomplete
  on(PokemonActions.loadPokemonIncrementalIncomplete, (state) => ({
    ...state,
    loading: [],
    loaded: false
  })),
  // Select Pokemon
  on(PokemonActions.selectPokemon, (state, { id }) => ({
    ...state,
    selectedPokemonId: id
  })),
  // Deselect Pokemon
  on(PokemonActions.deselectPokemon, (state) => ({
    ...state,
    selectedPokemonId: null
  })),
  // Change sort
  on(PokemonActions.selectSort, (state, { sortBy }) => ({ ...state, sortBy })),
  // Change sort
  on(PokemonActions.sortBy, (state, { sortBy }) => ({ ...state, sortBy })),
  // Change query
  on(PokemonActions.queryBy, (state, { query }) => ({ ...state, query }))
);

export function reducer(state: State | undefined, action: Action): State {
  return pokemonReducer(state, action);
}

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
// Helpers
export const selectPokemonIds = selectIds;
export const selectPokemonEntities = selectEntities;
export const selectAllPokemon = selectAll;
export const selectPokemonTotal = selectTotal;
