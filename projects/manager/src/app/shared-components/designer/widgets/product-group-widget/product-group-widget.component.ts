import { Component } from '@angular/core';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';
import { BreakpointService } from 'projects/manager/src/app/services/breakpoint.service';
import { WidgetType } from 'projects/manager/src/app/classes/widget-type';
import { ProductGroupType } from 'projects/manager/src/app/classes/product-group-type';
import { Product } from 'projects/manager/src/app/classes/product';
import { ProductGroupWidgetData } from 'projects/manager/src/app/classes/product-group-widget-data';
import { ColumnData } from 'projects/manager/src/app/classes/column-data';

@Component({
  selector: 'product-group-widget',
  templateUrl: './product-group-widget.component.html',
  styleUrls: ['./product-group-widget.component.scss']
})
export class ProductGroupWidgetComponent extends FreeformWidgetComponent {
  constructor(widgetService: WidgetService,
    breakpointService: BreakpointService) { super(widgetService, breakpointService) }

  public caption: string;
  public productGroupType: ProductGroupType = ProductGroupType.FeaturedProducts;
  public featuredProducts: Array<Product> = [];

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



  save(columnData: ColumnData) {
    let productGroupWidgetData = columnData.widgetData = new ProductGroupWidgetData();

    // Name
    if (this.name != 'Product Group') productGroupWidgetData.name = this.name;

    // Caption
    if (this.caption) productGroupWidgetData.caption = this.caption;

    // Product Group Type
    if (this.productGroupType != ProductGroupType.FeaturedProducts) productGroupWidgetData.productGroupType = this.productGroupType;

    // Featured Products
    if (this.featuredProducts.length > 0) productGroupWidgetData.featuredProducts = this.featuredProducts;

    super.save(columnData);
  }

}
