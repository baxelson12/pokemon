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
  // Actual
  pokemon$: Observable<PokemonBase[]> = this.store.select(
    Selectors.filterPokemon
  );

  // For staggering
  animationConfig = (i: number) => ({ value: '', params: { delay: i * 25 } });
  constructor(private store: Store, private r: Renderer2) {}
}
