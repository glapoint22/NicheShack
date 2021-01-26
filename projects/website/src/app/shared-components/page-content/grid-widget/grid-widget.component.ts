import { KeyValue } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GridData } from 'classes/grid-data';
import { QueryParams } from 'classes/query-params';
import { Subscription } from 'rxjs';
import { DataService } from 'services/data.service';
import { GridWidgetData } from '../../../classes/grid-widget-data';
import { WidgetComponent } from '../widget/widget.component';


@Component({
  selector: 'grid-widget',
  templateUrl: './grid-widget.component.html',
  styleUrls: ['./grid-widget.component.scss']
})
export class GridWidgetComponent extends WidgetComponent implements OnInit, OnDestroy {
  public gridData: GridData;
  public selectedSortOption: KeyValue<string, string>;
  public queryParams: QueryParams = new QueryParams;
  public showFilterMenu: boolean;
  private subscription: Subscription;
  private dataSet: boolean;
  private currentId: string;

  constructor(private dataService: DataService, public route: ActivatedRoute, private router: Router) { super() }


  ngOnInit() {
    this.queryParams.page = 1;
    this.queryParams.limit = screen.width >= 600 ? 40 : 20;


    this.subscription = this.route.queryParamMap
      .subscribe((params: ParamMap) => {
        if (this.dataSet && this.queryParams.search == params.get('search') && this.currentId == this.route.snapshot.paramMap.get('id')) {
          this.queryParams.set(params);
          this.dataService.loading = true;
          this.getGridData();
        }
      });
  }


  setData(widgetData: GridWidgetData) {
    this.queryParams.queries = widgetData.queries;
    this.queryParams.set(this.route.snapshot.queryParamMap);
    this.currentId = this.route.snapshot.paramMap.get('id');

    if (!this.queryParams.queries && !this.queryParams.search) {
      this.queryParams.queries = [{
        stringValue: this.currentId,
        logicalOperator: 1,
        queryType: 2
      }];
    }

    this.getGridData();

    super.setData(widgetData);
    this.dataSet = true;
  }




  getGridData() {
    this.dataService.post('api/Products/GridData', this.queryParams)
      .subscribe((gridData: GridData) => {
        this.gridData = gridData;

        let index = Math.max(0, this.gridData.sortOptions.findIndex(x => x.value == this.route.snapshot.queryParams['sort']));
        this.selectedSortOption = this.gridData.sortOptions[index];
        this.dataService.loading = false;
      });
  }



  setSort() {
    this.router.navigate([], {
      queryParams: { sort: this.selectedSortOption.value, page: null },
      queryParamsHandling: 'merge'
    });
  }


  getDefaultIndex() {
    // Used to display the defulat selection
    if (this.gridData.sortOptions) return this.gridData.sortOptions.findIndex(x => x == this.selectedSortOption);
    return {};
  }


  clearFilters() {
    this.router.navigate([], {
      queryParams: { filters: null },
      queryParamsHandling: 'merge'
    });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}