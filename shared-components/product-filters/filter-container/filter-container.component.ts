import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss']
})
export class FilterContainerComponent implements OnInit {
  @Input() caption: string;
  @ViewChild('content', { static: false }) content: ElementRef;
  public contentMaxHeight: number;
  public expanded: boolean;
  public show: boolean;
 
  ngOnInit() {
    this.expanded = this.show = screen.width >= 768 ? true : false;
  }


  onArrowClick() {
    this.contentMaxHeight = this.content.nativeElement.scrollHeight;
    if (this.show) {
      this.show = false;
      window.setTimeout(() => {
        this.expanded = false;
      });
    } else {
      this.expanded = true;
      this.show = true;
    }
  }

  transitionend() {
    if (this.expanded) this.contentMaxHeight = null;
  }
}