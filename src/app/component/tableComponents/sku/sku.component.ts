import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sku',
  templateUrl: './sku.component.html',
  styleUrl: './sku.component.scss',
})
export class SkuComponent {
  @Input() id!: number;
}
