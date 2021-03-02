import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { BadButtonModule } from '../button/button.module';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, AngularSvgIconModule, BadButtonModule],
  exports: [CardComponent]
})
export class BadCardModule {}
