import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { delay, filter, retryWhen, tap } from 'rxjs/operators';
import { PokemonBase } from '../../core/interfaces/PokemonBase';

import * as Selectors from '../../store/selectors';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent {
  // Get the container
  @ViewChild('wrapper') wrapper: ElementRef;
  // Get div element of container
  get div(): HTMLDivElement {
    try {
      return this.wrapper.nativeElement;
    } catch (error) {
      console.warn(
        'Attempting to access a native element before initialized.',
        error
      );
    }
  }
  // Get the grid cell width
  get cellWidth(): number {
    try {
      const cell = this.div.firstChild as HTMLDivElement;
      console.log(cell, this.div.firstElementChild, cell.offsetWidth, this.div);
      return cell.offsetWidth;
    } catch (error) {
      console.warn('Attempting to access a nonexistent child', error);
    }
  }
  loaded$: Observable<boolean> = this.store
    .select(Selectors.isPokemonLoaded)
    .pipe(tap(console.log));
  pokemon$: Observable<PokemonBase[]> = this.store
    .select(Selectors.selectSortedPokemon)
    .pipe(
      tap((arr) => console.log('len', arr.length, !!!arr.length, this.div)),
      filter((arr) => !!arr.length),
      tap(console.log),
      // Once we have items,
      // We need to even out the grid
      tap((arr) => {
        // prettier-ignore
        if (!this.div || !arr.length ) { return; }
        this.killGhosts();
        const len = arr.length;
        this.createGhosts(this.div.offsetWidth ?? 0, len, this.cellWidth);
      })
    );

  constructor(private store: Store, private r: Renderer2) {}

  /**
   * Creates a grid using flex.
   * @param containerWidth Overall width of container
   * @param cellCount Number of cells in the grid
   * @param cellWidth Width of cells
   */
  private createGhosts(
    containerWidth: number,
    cellCount: number,
    cellWidth: number
  ): void {
    console.log(containerWidth, cellCount, cellWidth);
    // prettier-ignore
    if (!cellCount) { return; }
    const rowLen = Math.floor(containerWidth / cellWidth);
    const remainder = cellCount % rowLen;
    const ghostCount = rowLen - remainder;
    // prettier-ignore
    if (!remainder) { return; }
    // Create ghosts
    for (let i = 0; i < ghostCount; i++) {
      const ghost: HTMLDivElement = this.r.createElement('div');
      this.r.setAttribute(ghost, 'class', 'ghost');
      this.r.setStyle(ghost, 'width', `${cellWidth}px`);
      this.r.appendChild(this.div, ghost);
    }
  }

  // Remove in order to rebuild
  private killGhosts(): void {
    const children = this.div.children;
    Array.from(children)
      .filter((child) => child.classList.contains('ghost'))
      .forEach((ghost) => this.r.removeChild(this.div, ghost));
  }
}
