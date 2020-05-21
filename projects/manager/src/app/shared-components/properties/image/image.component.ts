import { Component, Input } from '@angular/core';
import { Image } from '../../../classes/image';

@Component({
  selector: 'image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Input() image: Image;
}
