import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
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
   * Gets all first gen Pokemon
   */
  all(): Observable<PokemonBase[]> {
    const endpoint = `${environment.api}/pokemon?limit=151`;
    return this.http.get<ResultDTO>(endpoint).pipe(
      pluck('results'),
      mergeMap((res) => res),
      pluck('url'),
      // API not liking trailing slash
      map((url) => url.slice(0, -1)),
      concatMap((url) => this.http.get<PokemonDetailDTO>(url).pipe(delay(50))),
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
}
