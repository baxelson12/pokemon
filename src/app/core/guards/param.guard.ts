import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as Selectors from '../../store/selectors';

@Injectable({
  providedIn: 'root'
})
export class ParamGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // get entities
    return this.store.select(Selectors.selectPokemonEntities).pipe(
      // get params
      switchMap((entities) =>
        this.store
          .select(Selectors.selectParams)
          // Combine data
          .pipe(map((params) => ({ params, entities })))
      ),
      // Make determination
      map(({ params, entities }) =>
        entities[params.pokemonId] ? true : false
      ),
      // Failsafe
      catchError((e) => of(false))
    );
  }

  constructor(private store: Store, private router: Router) {}
}
