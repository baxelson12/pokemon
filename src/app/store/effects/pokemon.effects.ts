import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMapTo, map } from 'rxjs/operators';
import { DataService } from '../../core/services/data.service';

import * as PokemonActions from '../actions/pokemon.actions';

@Injectable()
export class PokemonEffects {
  loadPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemon),
      concatMapTo(this.ds.all()),
      map((pokemon) => PokemonActions.loadPokemonSuccess({ pokemon }))
      // wtf
      //   catchError(e => of(PokemonActions.loadPokemonFail())
    )
  );

  constructor(private actions$: Actions, private ds: DataService) {}
}
