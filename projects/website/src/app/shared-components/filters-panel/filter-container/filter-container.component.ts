import { Component, Input } from '@angular/core';

@Component({
  selector: 'filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss']
})
export class FilterContainerComponent {
  @Input() caption: string;
  public show: boolean = true;

  onArrowClick() {
    this.show = !this.show;
  }
}