import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import {
  catchError,
  concatMapTo,
  delay,
  exhaust,
  filter,
  flatMap,
  map,
  take,
  takeUntil,
  takeWhile,
  tap,
  timeout,
  toArray
} from 'rxjs/operators';
import { DataService } from '../../core/services/data.service';

import * as PokemonActions from '../actions/pokemon.actions';
import * as Selectors from '../selectors';

@Injectable()
export class PokemonEffects {
  loadPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemon),
      concatMapTo(this.ds.all()),
      map((pokemon) => PokemonActions.loadPokemonSuccess({ pokemon })),
      catchError((e) => PokemonActions.loadPokemonFail)
    )
  );

  loadPokemonIncrementally$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemonIncremental),
      concatMapTo(this.ds.increment()),
      map((pokemon) =>
        PokemonActions.loadPokemonIncrementalSuccess({ pokemon })
      ),
      takeUntil(
        this.store
          .select(Selectors.selectPokemonIds)
          .pipe(filter((res) => res.length === environment.limit))
      ),
      timeout(7500),
      catchError((e) => PokemonActions.loadPokemonIncrementalFail)
    )
  );

  watch$ = createEffect(() =>
    this.loadPokemonIncrementally$.pipe(
      toArray(),
      map((arr) =>
        arr.length === environment.limit - 1
          ? PokemonActions.loadPokemonIncrementalComplete()
          : PokemonActions.loadPokemonIncrementalIncomplete()
      )
    )
  );

  constructor(
    private actions$: Actions,
    private ds: DataService,
    private store: Store
  ) {}
}
