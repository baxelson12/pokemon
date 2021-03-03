import { Component } from '@angular/core';
import { RouterOutlet, Data } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation
} from 'angular-animations';
import { iif, Observable } from 'rxjs';

import * as Actions from './store/actions';
import * as Selectors from './store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()]
})
export class AppComponent {
  title = 'pokemon';

  loading$: Observable<boolean> = this.store.select(Selectors.pokemonLoading);

  constructor(private store: Store) {
    this.store.dispatch(Actions.loadPokemonIncremental());
  }
  // Router animations need state
  getRouterOutletState(o: RouterOutlet): Data {
    return o && o.activatedRouteData;
  }
}
