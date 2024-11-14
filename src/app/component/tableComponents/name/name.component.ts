import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrl: './name.component.scss',
})
export class NameComponent {
  constructor() {}
  @Input() name!: string;
}
