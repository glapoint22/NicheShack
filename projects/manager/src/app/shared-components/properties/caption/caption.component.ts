import { Component, Input } from '@angular/core';

@Component({
  selector: 'caption-property',
  templateUrl: './caption.component.html',
  styleUrls: ['./caption.component.scss']
})
export class CaptionComponent {
  @Input() caption: string;
}