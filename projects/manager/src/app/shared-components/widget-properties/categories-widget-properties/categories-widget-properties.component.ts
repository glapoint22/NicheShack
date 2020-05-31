import { Component, OnInit, Input } from '@angular/core';
import { CategoriesWidgetComponent } from '../../designer/widgets/categories-widget/categories-widget.component';

@Component({
  selector: 'categories-widget-properties',
  templateUrl: './categories-widget-properties.component.html',
  styleUrls: ['./categories-widget-properties.component.scss']
})
export class CategoriesWidgetPropertiesComponent implements OnInit {
  @Input() categoriesWidget: CategoriesWidgetComponent;

  constructor() { }

  ngOnInit() {
  }

}
