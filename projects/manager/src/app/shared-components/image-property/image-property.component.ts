import { Component, Input } from '@angular/core';

@Component({
  selector: 'image-property',
  templateUrl: './image-property.component.html',
  styleUrls: ['./image-property.component.scss']
})
export class ImagePropertyComponent {
  @Input() title: string;
  @Input() roundedPanel: boolean;
  @Input() image: string;

  openMediaBrowser() {
    // Opens the media browser
  }
}