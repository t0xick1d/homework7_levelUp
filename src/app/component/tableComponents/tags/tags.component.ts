import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
})
export class TagsComponent {
  @Input() category!: string;
  constructor() {
    this.category = 'sdasdasdasd';
  }
}
