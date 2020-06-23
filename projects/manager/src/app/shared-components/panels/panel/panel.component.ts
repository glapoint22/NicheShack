import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  @Input() title: string;
  @Input() rounded: boolean;
  @Input() expanded: boolean;
  @Output() onClick: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('content', { static: false }) content: ElementRef;
  
  public contentMaxHeight: number;
  public contentPadding: number = 14;

  ngAfterViewInit() {
    this.onContentLoad();
  }

  onContentLoad() {
    this.contentMaxHeight = this.content.nativeElement.scrollHeight + (this.contentPadding * 2);
  }

  click(input: HTMLInputElement) {
    this.onClick.emit(!input.checked);
    if(input.checked) {
      // window.setTimeout(()=> {
        this.contentMaxHeight = this.content.nativeElement.scrollHeight + (this.contentPadding * 2);
      // });
      
      window.setTimeout(()=> {
        this.expanded = false; 
      });
    } else {
      this.expanded = true;
    }
  }


  transitionend(event: any) {
    if(this.expanded) this.contentMaxHeight = null;
  }
}