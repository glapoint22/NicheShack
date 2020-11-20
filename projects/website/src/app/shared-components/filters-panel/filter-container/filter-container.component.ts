import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss']
})
export class FilterContainerComponent {
  @Input() caption: string;
  @ViewChild('content', { static: false }) content: ElementRef;
  public contentMaxHeight: number;
  public expanded: boolean = true;
  public show: boolean = true;

  

 

  onArrowClick() {
    if (this.show) {
      this.contentMaxHeight = this.content.nativeElement.scrollHeight;
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