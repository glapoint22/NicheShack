import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  @Input() title: string;
  @Input() rounded: boolean;
  @Input() expanded: boolean;
  @ViewChild('content', { static: false }) content: ElementRef;
  
  public contentMaxHeight: number;
  public contentPadding: number = 14;

  ngAfterViewInit() {
    this.onContentLoad();
  }

  onContentLoad() {
    this.contentMaxHeight = this.content.nativeElement.scrollHeight + (this.contentPadding * 2);
  }
}