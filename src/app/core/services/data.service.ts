import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  delay,
  map,
  mergeMap,
  pluck,
  toArray
} from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { PokemonDetailDTO, ResultDTO } from '../interfaces/DTOs';
import { PokemonBase } from '../interfaces/PokemonBase';
import { PokemonDetailed } from '../interfaces/PokemonDetailed';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  /**
   * Gets all first gen Pokemon at once.
   */
  all(): Observable<PokemonBase[]> {
    const endpoint = `${environment.api}/pokemon?limit=151`;
    return this.http.get<ResultDTO>(endpoint).pipe(
      pluck('results'),
      mergeMap((res) => res),
      pluck('url'),
      // API not liking trailing slash
      map((url) => url.slice(0, -1)),
      // This API is a bit weird... At times it will 404 on a url that -it- gave -me-
      // there could be some logic here to save the errored IDs to the store, and then retry at a later time
      // to replenish the array.
      concatMap((url) =>
        this.http.get<PokemonDetailDTO>(url).pipe(
          // Ease up on the server
          // delay(50),
          catchError((err) => {
            console.warn('Skipping a Pokemon.');
            return EMPTY;
          })
        )
      ),
      map(
        ({ id, name, types, sprites }) =>
          ({
            id,
            name,
            image: sprites.front_default,
            type: types[0].type.name
          } as PokemonBase)
      ),
      toArray()
    );
  }

  /**
   * Gets details of a selected Pokemon
   * @param pokemonId The ID of the selected pokemon
   */
  one(pokemonId: number): Observable<PokemonBase & PokemonDetailed> {
    const endpoint = `${environment.api}/pokemon/${pokemonId}`;
    return this.http.get<PokemonDetailDTO>(endpoint).pipe(
      map(({ id, height, weight, stats, name, types, sprites }) => {
        const statRecord = stats.reduce((acc, curr) => {
          acc[curr.stat.name] = curr.base_stat;
          return acc;
        }, {});

        return {
          id,
          name,
          image: sprites.front_default,
          type: types[0].type.name,
          height,
          weight,
          stats: statRecord
        } as PokemonBase & PokemonDetailed;
      })
    );
  }

  /**
   * Gets all first gen Pokemon incrementally
   */
  increment(): Observable<PokemonBase> {
    const endpoint = `${environment.api}/pokemon?limit=151`;
    return this.http.get<ResultDTO>(endpoint).pipe(
      pluck('results'),
      mergeMap((res) => res),
      pluck('url'),
      // API not liking trailing slash
      map((url) => url.slice(0, -1)),
      concatMap((url) =>
        this.http.get<PokemonDetailDTO>(url).pipe(
          // Ease up on the server
          delay(50),
          catchError((err) => {
            console.warn('Skipping a Pokemon.');
            return EMPTY;
          })
        )
      ),
      map(
        ({ id, name, types, sprites }) =>
          ({
            id,
            name,
            image: sprites.front_default,
            type: types[0].type.name
          } as PokemonBase)
      )
    );
  }
}
