import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements AfterViewInit {
  @Input() title: string;
  @Input() rounded: boolean;
  @ViewChild('content', { static: false }) content: ElementRef;
  public expanded: boolean;
  public contentMaxHeight: number;
  public contentPadding: number = 14;

  ngAfterViewInit(): void {
    // This is used to get the max height for when the panel expands and collapses
    this.contentMaxHeight = this.content.nativeElement.scrollHeight + (this.contentPadding * 2);
  }
}