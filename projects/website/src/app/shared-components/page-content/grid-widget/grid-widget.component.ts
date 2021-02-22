import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridData } from 'classes/grid-data';
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
  public showFilterMenu: boolean;

  constructor(private router: Router, public route: ActivatedRoute) { super() }


  setData(widgetData: GridWidgetData) {
    this.gridData = widgetData.gridData;
    this.setSortOption();
    super.setData(widgetData);
  }



  setSortOption() {
    if (this.gridData.sortOptions) {
      let index = Math.max(0, this.gridData.sortOptions.findIndex(x => x.value == this.route.snapshot.queryParams['sort']));
      this.selectedSortOption = this.gridData.sortOptions[index];
    }
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


  getPageNumber() {
    return this.route.snapshot.queryParams.page ? parseInt(this.route.snapshot.queryParams.page) : 1;
  }
}