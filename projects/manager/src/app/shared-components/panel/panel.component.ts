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
  @Output() onEnableOptionClick: EventEmitter<void> = new EventEmitter();
  @ViewChild('content', { static: false }) content: ElementRef;
  public expanded: boolean;
  public contentMaxHeight: number;
  public contentPadding: number = 14;


  click(input: HTMLInputElement) {
    this.contentMaxHeight = this.content.nativeElement.scrollHeight + (this.contentPadding * 2);

    if (input.checked) {
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