import { Component, Input, OnInit } from '@angular/core';
import { PokemonBase } from '../../interfaces/PokemonBase';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent {
  @Input() pokemon: PokemonBase;
  @Input() loading: boolean;
}
