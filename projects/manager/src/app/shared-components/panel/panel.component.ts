import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Enableable } from '../../classes/enableable';

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  @Input() title: string;
  @Input() rounded: boolean;
  @Input() enableableProperty: Enableable;
  @Output() onClick: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('content', { static: false }) content: ElementRef;
  public expanded: boolean;
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
    
    if (input.checked) {
      this.onContentLoad();

      window.setTimeout(() => {
        this.expanded = false;
      });
    } else {
      this.expanded = true;
    }
  }


  transitionend() {
    if (this.expanded) this.contentMaxHeight = null;
  }
}