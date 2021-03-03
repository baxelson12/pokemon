import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, pluck, reduce, take, tap } from 'rxjs/operators';

import * as Selectors from '../../store/selectors';
import * as Actions from '../../store/actions';
import { Observable } from 'rxjs';
import { PokemonBase } from 'src/app/core/interfaces/PokemonBase';
import { PokemonDetailed } from 'src/app/core/interfaces/PokemonDetailed';
import { Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  details$: Observable<PokemonBase & PokemonDetailed> = this.store
    .select(Selectors.selectPokemonDetails)
    .pipe(
      filter((d) => !!d.id),
      tap(console.log)
    );
  labels$: Observable<Label[]> = this.details$.pipe(
    pluck('stats'),
    map((stats) => Object.keys(stats))
  );
  data$: Observable<ChartDataSets[]> = this.details$.pipe(
    pluck('stats'),
    map((stats) => Object.values(stats)),
    map((data) => [{ data }])
  );
  constructor(private store: Store) {
    this.store
      .select(Selectors.selectParams)
      .pipe(take(1))
      .subscribe(({ pokemonId }) =>
        this.store.dispatch(Actions.loadDetails({ id: pokemonId }))
      );
  }
}
