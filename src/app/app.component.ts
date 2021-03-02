import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as Actions from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokemon';

  constructor(private store: Store) {
    this.store.dispatch(Actions.loadPokemon());
  }
}
