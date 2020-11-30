import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GridData } from 'classes/grid-data';
import { QueryParams } from 'classes/query-params';
import { DataService } from 'services/data.service';
import { GridWidgetData } from '../../../classes/grid-widget-data';
import { WidgetComponent } from '../widget/widget.component';


@Component({
  selector: 'grid-widget',
  templateUrl: './grid-widget.component.html',
  styleUrls: ['./grid-widget.component.scss']
})
export class GridWidgetComponent extends WidgetComponent {
  public gridData: GridData;
  public selectedSortOption: KeyValue<string, string>;
  public queryParams: QueryParams = new QueryParams;
  public search: string;
  public showFilterMenu: boolean;

  
  constructor(private dataService: DataService, public route: ActivatedRoute, private router: Router) {super()}


  ngOnInit() {
    this.queryParams.page = 1;
    this.queryParams.limit = screen.width >= 600 ? 40 : 20;
    

    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.search = params.get('search');

      // If we have queries
      if (this.queryParams.queries) {
        this.queryParams.set(params);
        this.getGridData();
      }
    });
  }


  setData(widgetData: GridWidgetData) {
    if (widgetData.queries) {
      this.queryParams.queries = widgetData.queries;
      this.queryParams.set(this.route.snapshot.queryParamMap);
      this.getGridData();
    }

    super.setData(widgetData);
  }




  getGridData() {
    this.dataService.post('api/Products/GridData', this.queryParams)
      .subscribe((gridData: GridData) => {
        this.gridData = gridData;

        let index = Math.max(0, this.gridData.sortOptions.findIndex(x => x.value == this.route.snapshot.queryParams['sort']));
        this.selectedSortOption = this.gridData.sortOptions[index];
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
}