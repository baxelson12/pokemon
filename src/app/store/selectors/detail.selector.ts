import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as FromReducer from '../reducers/detail.reducer';

// State slice
export const selectPokemonDetails = createFeatureSelector<FromReducer.State>(
  'details'
);

// There's gonna need to be a little more complex selections to get the
// data to fix chartjs expected data obj
