import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import * as PokemonReducer from './pokemon.reducer';
import * as DetailReducer from './detail.reducer';

export interface AppState {
  pokemon: PokemonReducer.State;
  details: DetailReducer.State;
  router: RouterReducerState<any>;
}

export const reducers: ActionReducerMap<AppState> = {
  pokemon: PokemonReducer.reducer,
  details: DetailReducer.reducer,
  router: routerReducer
};
