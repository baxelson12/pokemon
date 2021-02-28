import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { PokemonBase } from '../../core/interfaces/PokemonBase';
import * as PokemonActions from '../actions/pokemon.actions';

// Base model
export interface State extends EntityState<PokemonBase> {
  selectedPokemonId: number | null;
  loading: boolean;
  loaded: boolean;
  sortBy: string;
}

// Get selected pokemon ID
export function selectPokemonId(p: PokemonBase): number {
  return p.id;
}

// Default sort by
// export function sortPriceDesc(a: PokemonBase, b: PokemonBase): number {
//     return SortDescending(a.name, b.name);
// }

// Generate adapter
export const adapter: EntityAdapter<PokemonBase> = createEntityAdapter<PokemonBase>(
  {
    selectId: selectPokemonId
    // sortComparer: sortPriceDesc
  }
);

// Initial state
export const initial: State = adapter.getInitialState({
  selectedPokemonId: null,
  sortBy: 'nameDesc',
  loading: true,
  loaded: false
});

export const pokemonReducer = createReducer(
  // Initial state
  initial,
  // Begin load
  on(PokemonActions.loadPokemon, (state) => ({ ...state, loading: true })),
  // Loading failed
  on(PokemonActions.loadPokemonFail, (state) => ({ ...state, loading: false })),
  // Loaded
  on(PokemonActions.loadPokemonSuccess, (state, { pokemon }) =>
    adapter.setAll(pokemon, { ...state, loaded: true, loading: false })
  ),
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
  on(PokemonActions.selectSort, (state, { sortBy }) => ({ ...state, sortBy }))
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
