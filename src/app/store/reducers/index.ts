import * as PokemonReducer from './pokemon.reducer';
import * as DetailReducer from './detail.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  pokemon: PokemonReducer.State;
  details: DetailReducer.State;
}

export const reducers: ActionReducerMap<AppState> = {
  pokemon: PokemonReducer.reducer,
  details: DetailReducer.reducer
};
