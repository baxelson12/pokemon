import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllRoutingModule } from './all-routing.module';
import { AllComponent } from './all.component';
import { PokemonModule } from '../../core/components/pokemon/pokemon.module';
import { BadCardModule } from 'src/app/shared/components/card/card.module';

@NgModule({
  declarations: [AllComponent],
  imports: [CommonModule, AllRoutingModule, PokemonModule, BadCardModule]
})
export class AllModule {}
