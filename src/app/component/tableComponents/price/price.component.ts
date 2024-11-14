import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrl: './price.component.scss',
})
export class PriceComponent {
  @Input() price!: number;
  @Input() discount!: string;
}
