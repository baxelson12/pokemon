import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PokemonBase } from '../../core/interfaces/PokemonBase';
import { SortAscending, SortDescending } from '../../shared/utils/sort';

import * as FromReducer from '../reducers/pokemon.reducer';

// State slice
export const selectPokemonState = createFeatureSelector<FromReducer.State>(
  'pokemon'
);

// All Pokemon array
export const selectAllPokemon = createSelector(
  selectPokemonState,
  FromReducer.selectAllPokemon
);

// All Pokemon count
export const selectPokemonTotal = createSelector(
  selectPokemonState,
  FromReducer.selectPokemonTotal
);

// All Pokemon entities
export const selectPokemonEntities = createSelector(
  selectPokemonState,
  FromReducer.selectPokemonEntities
);

// Selected Pokemon
export const selectedPokemon = createSelector(
  selectPokemonState,
  (state: FromReducer.State) => state.entities[state.selectedPokemonId]
);

// Sorted array
export const selectSortedPokemon = createSelector(
  selectAllPokemon,
  selectPokemonState,
  (array, state) => {
    switch (state.sortBy) {
      case 'idAsc': {
        return array.slice().sort((a, b) => SortAscending(a.id, b.id));
      }
      case 'idDesc': {
        return array.slice().sort((a, b) => SortDescending(a.id, b.id));
      }
    }
  }
);

// Filter by query
export const filterPokemon = createSelector(
  selectSortedPokemon,
  selectPokemonState,
  (arr: PokemonBase[], state: FromReducer.State) =>
    arr.filter((v) => v.name.toLowerCase().includes(state.query.toLowerCase()))
);

// Loaded?
export const isPokemonLoaded = createSelector(
  selectPokemonState,
  (state) => state.loaded
);

// Loading?
export const pokemonLoading = createSelector(
  selectPokemonState,
  (state) => state.loading
);
