import { Component } from '@angular/core';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';
import { BreakpointService } from 'projects/manager/src/app/services/breakpoint.service';
import { WidgetType } from 'projects/manager/src/app/classes/widget-type';
import { ProductGroupType } from 'projects/manager/src/app/classes/product-group-type';
import { Product } from 'projects/manager/src/app/classes/product';
import { ProductGroupWidgetData } from 'projects/manager/src/app/classes/product-group-widget-data';

@Component({
  selector: 'product-group-widget',
  templateUrl: './product-group-widget.component.html',
  styleUrls: ['./product-group-widget.component.scss']
})
export class ProductGroupWidgetComponent extends FreeformWidgetComponent {
  constructor(widgetService: WidgetService,
    breakpointService: BreakpointService) { super(widgetService, breakpointService) }

  public caption: string;
  public productGroupType: ProductGroupType = 0;
  public featuredProducts: Array<Product>;

  ngOnInit() {
    this.height = 250
    this.name = 'Product Group';
    this.type = WidgetType.ProductGroup;
    super.ngOnInit();
  }

  load(widgetData: ProductGroupWidgetData) {
    this.caption = widgetData.caption;
    this.productGroupType = widgetData.productGroupType;
    this.featuredProducts = widgetData.featuredProducts;
    super.load(widgetData);
  }

}
