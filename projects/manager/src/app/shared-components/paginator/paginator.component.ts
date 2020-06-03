import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  @Input() itemCount: number;
  @Output() onItemChange: EventEmitter<number> = new EventEmitter();
  public currentIndex: number = 0;

  
  onArrowClick(direction: number) {
    if(this.itemCount == 0) return;

    this.currentIndex = Math.min(Math.max(0, this.currentIndex + direction), this.itemCount - 1);
    this.onItemChange.emit(this.currentIndex);
  }
}