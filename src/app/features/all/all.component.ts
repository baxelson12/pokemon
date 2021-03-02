import { Component, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation
} from 'angular-animations';
import { Observable } from 'rxjs';
import { PokemonBase } from '../../core/interfaces/PokemonBase';

import * as Selectors from '../../store/selectors';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss'],
  animations: [
    fadeInOnEnterAnimation({ anchor: 'enter' }),
    fadeOutOnLeaveAnimation({ anchor: 'exit' })
  ]
})
export class AllComponent {
  loading$: Observable<null[]> = this.store.select(Selectors.pokemonLoading);
  pokemon$: Observable<PokemonBase[]> = this.store.select(
    Selectors.filterPokemon
  );

  animationConfig = (i: number) => ({ value: '', params: { delay: i * 50 } });
  constructor(private store: Store, private r: Renderer2) {}
}
