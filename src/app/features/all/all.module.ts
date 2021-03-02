import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllRoutingModule } from './all-routing.module';
import { AllComponent } from './all.component';
import { PokemonModule } from '../../core/components/pokemon/pokemon.module';

@NgModule({
  declarations: [AllComponent],
  imports: [CommonModule, AllRoutingModule, PokemonModule]
})
export class AllModule {}
