import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalPlainComponent } from './components/modal-plain/modal-plain.component';

const COMPONENTS = [ModalPlainComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [CommonModule],
  exports: COMPONENTS
})
export class BadModalModule {}
