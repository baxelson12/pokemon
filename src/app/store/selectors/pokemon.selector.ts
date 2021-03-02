import { createFeatureSelector, createSelector } from '@ngrx/store';
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

// Filter by query
// export const filterPokemons = createSelector(
//   selectAllPokemons,
//   selectPokemonState,
//   (arr: Pokemon[], state: FromReducer.State) =>
//     arr.filter((v) => v.name.toLowerCase().includes(state.query.toLowerCase()))
// );

// Sorted array
export const selectSortedPokemons = createSelector(
  selectAllPokemon,
  selectPokemonState,
  (array, state) => {
    switch (state.sortBy) {
      case 'nameAsc': {
        return array.slice().sort((a, b) => SortAscending(a.name, b.name));
      }
      case 'nameDesc': {
        return array.slice().sort((a, b) => SortDescending(a.name, b.name));
      }
    }
  }
);
