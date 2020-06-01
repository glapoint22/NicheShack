import { Component } from '@angular/core';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';
import { BreakpointService } from 'projects/manager/src/app/services/breakpoint.service';
import { WidgetType } from 'projects/manager/src/app/classes/widget-type';
import { Category } from 'projects/manager/src/app/classes/category';
import { CategoriesWidgetData } from 'projects/manager/src/app/classes/categories-widget-data';

@Component({
  selector: 'categories-widget',
  templateUrl: './categories-widget.component.html',
  styleUrls: ['./categories-widget.component.scss']
})
export class CategoriesWidgetComponent extends FreeformWidgetComponent {
  constructor(widgetService: WidgetService,
    breakpointService: BreakpointService) { super(widgetService, breakpointService) }

    public caption: string;
    public categories: Array<Category>;


    ngOnInit() {
      this.height = 250
      this.name = 'Categories';
      this.type = WidgetType.Categories;
      super.ngOnInit();
    }

    load(widgetData: CategoriesWidgetData) {
      this.caption = widgetData.caption;
      this.categories = widgetData.categories;
      super.load(widgetData);
    }
}
