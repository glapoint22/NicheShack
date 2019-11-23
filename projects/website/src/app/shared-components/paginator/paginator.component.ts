import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnChanges {
  @Input() public pageCount: number;
  @Input() public currentPage: number;
  @Output() onPageChange: EventEmitter<number> = new EventEmitter();
  public pages: Array<string>;

  ngOnChanges() {
    this.pages = [];

    this.pages.push('1');
    if (this.currentPage >= 4 && this.pageCount > 5) {
      this.pages.push('...');

      if (this.pageCount - this.currentPage < 3) {
        for (let i = this.pageCount - 3; i < this.pageCount; i++) {
          this.pages.push(i.toString());
        }
      } else {
        for (let i = this.currentPage - 1; i < Math.min(this.currentPage + 2, this.pageCount); i++) {
          this.pages.push(i.toString());
        }
      }
      if (this.pageCount - this.currentPage > 2) this.pages.push('...');
    } else {
      for (let i = 2; i <= Math.min(this.pageCount - 1, 4); i++) {
        this.pages.push(i.toString());
      }
      if (this.pageCount > 5) this.pages.push('...');
    }
    if (this.pageCount > 1) this.pages.push(this.pageCount.toString());
  }
}