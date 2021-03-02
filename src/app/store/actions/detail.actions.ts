import { createAction, props } from '@ngrx/store';
import { PokemonBase } from '../../core/interfaces/PokemonBase';
import { PokemonDetailed } from '../../core/interfaces/PokemonDetailed';

// Load details
export const LOAD_DETAILS = '[Details] Load details.';
export const LOAD_DETAILS_FAIL = '[Details] Load details fail.';
export const LOAD_DETAILS_SUCCESS = '[Details] Load details success.';

export const loadDetails = createAction(LOAD_DETAILS, props<{ id: number }>());
export const loadDetailsFail = createAction(LOAD_DETAILS_FAIL);
export const loadDetailsSuccess = createAction(
  LOAD_DETAILS_SUCCESS,
  props<{ details: PokemonBase & PokemonDetailed }>()
);

// Reset
export const RESET_DETAILS = '[Details] Reset.';
export const resetDetails = createAction(RESET_DETAILS);
