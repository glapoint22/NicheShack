import { Component, OnInit, Input } from '@angular/core';
import { TextWidgetComponent } from '../../../designer/widgets/text-widget/text-widget.component';

@Component({
  selector: 'text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {
  @Input() textWidget: TextWidgetComponent;

  constructor() { }

  ngOnInit() {
  }

}
