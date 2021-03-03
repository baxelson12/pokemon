import { Component } from '@angular/core';
import { RouterOutlet, Data } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation
} from 'angular-animations';

import * as Actions from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()]
})
export class AppComponent {
  title = 'pokemon';

  constructor(private store: Store) {
    this.store.dispatch(Actions.loadPokemonIncremental());
  }
  // Router animations need state
  getRouterOutletState(o: RouterOutlet): Data {
    return o && o.activatedRouteData;
  }
}
