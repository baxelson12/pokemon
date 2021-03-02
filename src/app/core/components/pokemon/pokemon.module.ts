import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonComponent } from './pokemon.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { BadCardModule } from '../../../shared/components/card/card.module';
import { BadButtonModule } from '../../../shared/components/button/button.module';

@NgModule({
  declarations: [PokemonComponent],
  imports: [CommonModule, AngularSvgIconModule, BadCardModule, BadButtonModule],
  exports: [PokemonComponent]
})
export class PokemonModule {}
