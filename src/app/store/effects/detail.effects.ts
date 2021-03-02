import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, concatMap, catchError } from 'rxjs/operators';

import { of } from 'rxjs';
import { DataService } from '../../core/services/data.service';

import * as DetailActions from '../actions/detail.actions';

@Injectable()
export class DetailEffects {
  loadDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DetailActions.loadDetails),
      concatMap(({ id }) => this.ds.one(id)),
      map((details) => DetailActions.loadDetailsSuccess({ details })),
      catchError((_) => of(DetailActions.loadDetailsFail()))
    )
  );
  constructor(private actions$: Actions, private ds: DataService) {}
}
