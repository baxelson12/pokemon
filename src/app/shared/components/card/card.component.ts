import { Component, Input } from '@angular/core';

@Component({
  selector: 'bad-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() id: number;
  @Input() name: string;
  @Input() img: string;
  @Input('img-alt') imgAlt: string;
  @Input() loading = false;
}
