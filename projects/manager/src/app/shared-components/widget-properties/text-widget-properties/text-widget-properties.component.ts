import { Component, OnInit, Input } from '@angular/core';
import { TextWidgetComponent } from '../../designer/widgets/text-widget/text-widget.component';

@Component({
  selector: 'text-widget-properties',
  templateUrl: './text-widget-properties.component.html',
  styleUrls: ['./text-widget-properties.component.scss']
})
export class TextWidgetPropertiesComponent implements OnInit {
  @Input() textWidget: TextWidgetComponent;
  constructor() { }

  ngOnInit() {
  }

}
