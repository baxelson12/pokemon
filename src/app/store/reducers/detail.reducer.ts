import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { PokemonBase } from '../../core/interfaces/PokemonBase';
import { PokemonDetailed } from '../../core/interfaces/PokemonDetailed';
import * as DetailActions from '../actions/detail.actions';

// Base model
export type State = PokemonBase &
  PokemonDetailed & { loading: boolean; loaded: boolean };

// Initial state
export const initial: State = {
  id: null,
  name: '',
  height: null,
  weight: null,
  type: null,
  stats: null,
  loading: true,
  loaded: false
};

const detailReducer = createReducer(
  // Initial state
  initial,
  // Begin load
  on(DetailActions.loadDetails, (state) => ({
    ...state,
    loading: true,
    loaded: false
  })),
  // Loading failed
  on(DetailActions.loadDetailsFail, (state) => ({
    ...state,
    loading: false,
    loaded: false
  })),
  // Loaded
  on(DetailActions.loadDetailsSuccess, (state, { details }) => ({
    ...state,
    ...details,
    loaded: true,
    loading: false
  })),
  // Reset
  on(DetailActions.resetDetails, (state) => ({
    ...state,
    ...initial,
    loading: false
  }))
);

export function reducer(state: State | undefined, action: Action): State {
  return detailReducer(state, action);
}
