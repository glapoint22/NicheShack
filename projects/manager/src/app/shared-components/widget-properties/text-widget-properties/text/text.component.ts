import { Component, Input } from '@angular/core';
import { TextWidgetComponent } from '../../../designer/widgets/text-widget/text-widget.component';

@Component({
  selector: 'text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  @Input() textWidget: TextWidgetComponent;
}