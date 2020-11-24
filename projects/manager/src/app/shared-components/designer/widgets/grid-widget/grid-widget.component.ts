import { Component, OnInit } from '@angular/core';
import { GridWidgetData } from 'projects/manager/src/app/classes/grid-widget-data';
import { WidgetType } from 'classes/widget-type';
import { Query } from 'projects/manager/src/app/classes/query';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';
import { Filters } from 'classes/filters';
import { Product } from 'classes/product';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'grid-widget',
  templateUrl: './grid-widget.component.html',
  styleUrls: ['./grid-widget.component.scss']
})
export class GridWidgetComponent extends FreeformWidgetComponent implements OnInit {
  public queries: Array<Query> = [];
  public filters: Filters;
  public products: Array<Product>;
  public page: number = 1;
  public pageCount: number;
  public sortOptions: Array<KeyValue<string, string>>;
  public selectedSortOption: KeyValue<string, string>;
  public totalProducts: number = 0;
  public productCountStart: number = 0;
  public productCountEnd: number = 0;
  

  ngOnInit() {
    this.name = this.defaultName = 'Grid';
    this.type = WidgetType.Grid;
    
    super.ngOnInit();
  }


  setData(widgetData: GridWidgetData) {
    if (widgetData.queries) this.queries = widgetData.queries;

    super.setData(widgetData);
  }



  getData(): GridWidgetData {
    let widgetData = super.getData();

    return {
      name: this.name != this.defaultName ? this.name : null,
      widgetType: widgetData.widgetType,
      width: null,
      height: null,
      horizontalAlignment: widgetData.horizontalAlignment,
      breakpoints: [],
      queries: this.queries.length > 0 ? this.queries : []
    }
  }

  setSort() {
    
  }
}