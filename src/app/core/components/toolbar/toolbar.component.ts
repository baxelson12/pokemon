import { Component, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, throttleTime } from 'rxjs/operators';
import { InputComponent } from '../../../shared/components/input/input.component';
import { SortBy } from '../../../shared/types/sortBy';

import * as Actions from '../../../store/actions';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  providers: [ComponentStore]
})
export class ToolbarComponent implements OnDestroy {
  // For focusing
  @ViewChild('input') input: InputComponent;
  // For cleanup
  subscription: Subscription;
  // Search form
  form = this.fb.group({
    query: this.fb.control('')
  });
  // Sortby
  sort$: Observable<SortBy> = this.cs.select((s) => s.sortBy);
  // Watch for slashes
  @HostListener('document:keydown', ['$event'])
  handleKeypress(e: KeyboardEvent): void {
    if (e.code === 'Slash' && e.composedPath().length < 6) {
      e.preventDefault();
      this.input.focus();
    }
  }

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private cs: ComponentStore<{ sortBy: SortBy }>
  ) {
    this.cs.setState({ sortBy: 'idAsc' });
    this.subscription = this.form.valueChanges
      .pipe(debounceTime(100))
      .subscribe(({ query }) =>
        // Keep store in sync
        this.store.dispatch(Actions.queryBy({ query }))
      );
  }
  // Change the sort direction
  sort(sort: SortBy): void {
    switch (sort) {
      case 'idAsc':
        this.store.dispatch(Actions.sortBy({ sortBy: 'idDesc' }));
        this.cs.setState({ sortBy: 'idDesc' });
        break;
      case 'idDesc':
        this.store.dispatch(Actions.sortBy({ sortBy: 'idAsc' }));
        this.cs.setState({ sortBy: 'idAsc' });
        break;
    }
  }

  // Cleanup
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
