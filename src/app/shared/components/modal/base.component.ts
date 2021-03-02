import {
  Directive,
  EventEmitter,
  OnDestroy,
  Output,
  Renderer2
} from '@angular/core';
import { Router } from '@angular/router';
/* tslint:disable */
@Directive()
export class BaseModal implements OnDestroy {
  @Output() modalClose = new EventEmitter<any>();

  constructor(private r: Router, private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'overflow-hidden');
  }

  handleBackdropClick(): void {
    this.close();
  }

  close($event?: any): void {
    const e = $event ?? null;
    this.r.navigate([{ outlets: { modal: null } }]);
    this.modalClose.emit(e);
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'overflow-hidden');
  }
}
