import { Component, OnInit } from '@angular/core';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';
import { WidgetType } from 'classes/widget-type';
import { ProductGroupWidgetData } from 'projects/manager/src/app/classes/product-group-widget-data';
import { Caption } from 'projects/manager/src/app/classes/caption';
import { Color } from 'classes/color';
import { QueryParams } from 'classes/query-params';
import { Query } from 'classes/query';
import { QueryableWidget } from 'classes/queryable-widget';
import { BreakpointService } from 'projects/manager/src/app/services/breakpoint.service';
import { DataService } from 'services/data.service';
import { Product } from 'classes/product';

@Component({
  selector: 'product-group-widget',
  templateUrl: './product-group-widget.component.html',
  styleUrls: ['./product-group-widget.component.scss']
})
export class ProductGroupWidgetComponent extends FreeformWidgetComponent implements OnInit, QueryableWidget {
  public caption: Caption = new Caption();
  public queryParams: QueryParams = new QueryParams;
  public products: Array<Product>;

  constructor(breakpointService: BreakpointService, private dataService: DataService){super(breakpointService)}

  ngOnInit() {
    this.height = 250
    this.name = this.defaultName = 'Product Group';
    this.type = WidgetType.ProductGroup;
    this.caption.text = 'Check out these products';
    this.caption.color = new Color(255, 187, 0, 1);
    this.caption.fontSize.selectedIndex = 9;
    this.caption.fontSize.styleValue = this.caption.fontSize.options[this.caption.fontSize.selectedIndex].value;
    this.queryParams.limit = 20;
    super.ngOnInit();
  }

  setData(widgetData: ProductGroupWidgetData) {
    this.caption.setData(widgetData.caption);
    if (widgetData.queries) {
      this.queryParams.queries = widgetData.queries;
      this.getProducts();
    }
    super.setData(widgetData);
  }



  getData(): ProductGroupWidgetData {
    let widgetData = super.getData();

    return {
      name: this.name != this.defaultName ? this.name : null,
      widgetType: widgetData.widgetType,
      width: widgetData.width,
      height: null,
      horizontalAlignment: widgetData.horizontalAlignment,
      caption: this.caption.getData(),
      breakpoints: [],
      queries: this.queryParams.queries.length > 0 ? this.queryParams.queries : []
    }
  }


  query(queries: Array<Query>) {
    this.queryParams.queries = queries;
    this.column.row.container.save();
    this.getProducts();
  }



  getProducts() {
    this.dataService.post('api/Products/ProductGroup', this.queryParams)
      .subscribe((products: Array<Product>) => {
        this.products = products;
      });
  }


  buildPreview(parent: HTMLElement) {
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

    parent.appendChild(productGroupContainer);
  }
}
