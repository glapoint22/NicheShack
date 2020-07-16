import { Component } from '@angular/core';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';
import { BreakpointService } from 'projects/manager/src/app/services/breakpoint.service';
import { WidgetType } from 'projects/manager/src/app/classes/widget-type';
import { ProductGroupType } from 'projects/manager/src/app/classes/product-group-type';
import { Product } from 'projects/manager/src/app/classes/product';
import { ProductGroupWidgetData } from 'projects/manager/src/app/classes/product-group-widget-data';
import { ColumnData } from 'projects/manager/src/app/classes/column-data';
import { Caption } from 'projects/manager/src/app/classes/caption';
import { Color } from 'projects/manager/src/app/classes/color';

@Component({
  selector: 'product-group-widget',
  templateUrl: './product-group-widget.component.html',
  styleUrls: ['./product-group-widget.component.scss']
})
export class ProductGroupWidgetComponent extends FreeformWidgetComponent {
  constructor(widgetService: WidgetService,
    breakpointService: BreakpointService) { super(widgetService, breakpointService) }

    public caption: Caption = new Caption();
  public productGroupType: ProductGroupType = ProductGroupType.FeaturedProducts;
  public featuredProducts: Array<Product> = [];

  ngOnInit() {
    this.height = 250
    this.name = 'Product Group';
    this.type = WidgetType.ProductGroup;
    this.caption.text = 'Check out these products';
    this.caption.color = new Color(255, 187, 0, 1);
    this.caption.fontSize.selectedIndex = 9;
    this.caption.fontSize.styleValue = this.caption.fontSize.options[this.caption.fontSize.selectedIndex].value;
    super.ngOnInit();
  }

  setData(widgetData: ProductGroupWidgetData) {
    this.caption.setData(widgetData.caption);
    this.productGroupType = widgetData.productGroupType;
    this.featuredProducts = widgetData.featuredProducts;
    super.setData(widgetData);
  }



  getData(columnData: ColumnData) {
    let productGroupWidgetData = columnData.widgetData = new ProductGroupWidgetData();

    // Name
    if (this.name != 'Product Group') productGroupWidgetData.name = this.name;

    // Caption
    this.caption.getData(productGroupWidgetData.caption);

    // Product Group Type
    if (this.productGroupType != ProductGroupType.FeaturedProducts) productGroupWidgetData.productGroupType = this.productGroupType;

    // Featured Products
    if (this.featuredProducts.length > 0) productGroupWidgetData.featuredProducts = this.featuredProducts;

    super.getData(columnData);
  }


  buildHTML(parent: HTMLElement) {
    // Product Group Container
    let productGroupContainer = document.createElement('div');
    productGroupContainer.style.width = '100%';
    productGroupContainer.style.border = '1px solid #747474';

    // Caption
    let caption = document.createElement('div');
    caption.style.textAlign = 'center';
    caption.style.wordBreak = 'break-word';
    caption.innerText = this.caption.text;
    this.caption.applyStyle(caption);
    
    // Product Group
    let productGroup = document.createElement('div');
    productGroup.innerText = 'Product Group';
    productGroup.style.display = 'flex';
    productGroup.style.justifyContent = 'center';
    productGroup.style.alignItems = 'center';
    productGroup.style.width = '100%';
    productGroup.style.height = '272px';
    productGroup.style.fontSize = '22px';
    productGroup.style.textAlign = 'center';

    // Append
    productGroupContainer.appendChild(caption);
    productGroupContainer.appendChild(productGroup);

    // Set the classes
    this.breakpointService.setBreakpointClasses(this, productGroupContainer);

    parent.appendChild(productGroupContainer);
  }
}
