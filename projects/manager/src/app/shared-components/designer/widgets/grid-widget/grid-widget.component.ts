import { Component, OnInit } from '@angular/core';
import { GridWidgetData } from 'projects/manager/src/app/classes/grid-widget-data';
import { WidgetType } from 'classes/widget-type';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';
import { Query } from 'classes/query';
import { QueryableWidget } from 'classes/queryable-widget';
import { BreakpointService } from 'projects/manager/src/app/services/breakpoint.service';
import { DataService } from 'services/data.service';
import { QueryParams } from 'classes/query-params';
import { GridData } from 'classes/grid-data';
import { KeyValue } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'grid-widget',
  templateUrl: './grid-widget.component.html',
  styleUrls: ['./grid-widget.component.scss']
})
export class GridWidgetComponent extends FreeformWidgetComponent implements OnInit, QueryableWidget {
  public queries: Array<Query> = [];
  public gridData: GridData;
  public selectedSortOption: KeyValue<string, string>;
  public queryParams: QueryParams = new QueryParams;

  constructor(
    breakpointService: BreakpointService,
    private dataService: DataService,
    public route: ActivatedRoute,
    private router: Router
  ) { super(breakpointService) }


  ngOnInit() {
    this.name = this.defaultName = 'Grid';
    this.type = WidgetType.Grid;

    super.ngOnInit();

    this.queryParams.page = 1;
    this.queryParams.limit = 40;

    this.route.queryParamMap.subscribe((params: ParamMap) => {

      // If we have queries
      if (this.queryParams.queries) {
        this.queryParams.set(params);
        this.query(this.queryParams.queries);
      }
    });
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
    this.router.navigate([], {
      queryParams: { sort: this.selectedSortOption.value, page: null },
      queryParamsHandling: 'merge'
    });
  }



  query(queries: Array<Query>) {
    this.queryParams.queries = queries;

    this.dataService.post('api/Products/GridData', this.queryParams)
      .subscribe((gridData: GridData) => {
        this.gridData = gridData;

        let index = Math.max(0, this.gridData.sortOptions.findIndex(x => x.value == this.route.snapshot.queryParams['sort']));
        this.selectedSortOption = this.gridData.sortOptions[index];
      });
  }



  clearFilters() {
    this.router.navigate([], {
      queryParams: { filters: null },
      queryParamsHandling: 'merge'
    });
  }
}