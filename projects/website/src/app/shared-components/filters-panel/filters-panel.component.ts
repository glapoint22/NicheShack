import { isPlatformBrowser, KeyValue } from '@angular/common';
import { Component, Inject, Input, OnChanges, PLATFORM_ID, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CheckboxComponent } from 'shared-components/custom-input/checkbox/checkbox.component';
import { Filters } from '../../classes/filters';
import { QueryFilter } from '../../classes/query-filter';
import { QueryFilterOption } from '../../classes/query-filter-option';
import { CustomFilterComponent } from './custom-filter/custom-filter.component';
import { FilterComponent } from './filter/filter.component';
import { PriceFilterComponent } from './price-filter/price-filter.component';
import { RatingFilterComponent } from './rating-filter/rating-filter.component';

@Component({
  selector: 'filters-panel',
  templateUrl: './filters-panel.component.html',
  styleUrls: ['./filters-panel.component.scss']
})
export class FiltersPanelComponent implements OnChanges {
  @Input() filters: Filters;
  @ViewChildren('customFilter') customFilters: QueryList<CustomFilterComponent>;
  @ViewChild('ratingFilter', { static: false }) ratingFilter: RatingFilterComponent;
  @ViewChild('priceFilter', { static: false }) priceFilter: PriceFilterComponent;
  private queryFilters: Array<QueryFilter> = [];
  private urlUpdated: boolean;


  constructor(private router: Router, private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object) { }




  ngOnChanges() {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.filters) return;
      

      window.setTimeout(() => {

        if (!this.urlUpdated) {
          // Get the filters from the query params
          let filterString: string = this.route.snapshot.queryParams['filters'];

          // Reset the query filters array
          this.queryFilters = [];

          // If we have filters
          if (filterString) {
            filterString = decodeURIComponent(filterString);

            let filterArray: Array<string> = filterString.split('|');

            // Populate the query filters array
            for (let i = 0; i < filterArray.length - 1; i++) {
              let caption = filterArray[i];
              let options: Array<QueryFilterOption> = filterArray[i + 1].split(',').map(x => ({
                id: x,
                label: null
              }));

              i++;
              this.queryFilters.push({
                caption: caption,
                options: options
              });
            }
          }
        }

        // Set the filter options


        // Price range
        let queryFilter: QueryFilter = this.queryFilters.find(x => x.caption == 'Price Range');

        if (queryFilter) {
          let optionsArray = queryFilter.options[0].id.split('-');
          this.priceFilter.min = this.priceFilter.currentMin = this.priceFilter.currentMin = optionsArray[0];
          this.priceFilter.max = this.priceFilter.currentMax = this.priceFilter.currentMax = optionsArray[1];
          this.priceFilter.showClearPrice = true;
        } else {
          this.priceFilter.resetPriceForm();
        }



        // Price Filter
        this.setFilterOptions(this.priceFilter);




        // Rating Filter
        this.setFilterOptions(this.ratingFilter);


        // Custom Filters
        this.customFilters.forEach((customFilter: CustomFilterComponent) => {
          this.setFilterOptions(customFilter);
        });
      });


      this.urlUpdated = false;
    }
  }



  setFilterOptions(filterComponent: FilterComponent) {
    let queryFilter: QueryFilter = this.queryFilters.find(x => x.caption == filterComponent.filter.caption);

    filterComponent.checkboxes.forEach((checkbox: CheckboxComponent) => {
      if (queryFilter) {
        checkbox.checked = queryFilter.options.some(x => x.id == checkbox.value);
      } else {
        checkbox.checked = false;
      }
    });
  }



  setFilter(filter: KeyValue<string, any>) {
    // Find the filter in the query filters array
    let queryFilter: QueryFilter = this.queryFilters.find(x => x.caption == filter.key);

    // If found
    if (queryFilter) {
      // Get the index of the filter's option
      let index = queryFilter.options.findIndex(x => x.id == filter.value);

      // If the filter option is found
      if (index != -1) {
        // Remove the option
        queryFilter.options.splice(index, 1);

        // If there are no more options, remove the filter from the query filters array
        if (queryFilter.options.length == 0) {
          this.queryFilters.splice(this.queryFilters.findIndex(x => x.caption == queryFilter.caption), 1);
        }

        // The filter option was not found
      } else {
        // Add the new option
        if (queryFilter.caption == 'Price Range') {
          queryFilter.options[0] = {
            id: filter.value,
            label: null
          }
        } else {
          queryFilter.options.push({
            id: filter.value,
            label: null
          });
        }
      }


      // The filter was not found
    } else {
      this.queryFilters.push({
        caption: filter.key,
        options: [{
          id: filter.value,
          label: null
        }]
      });
    }

    this.updateUrl();
  }



  buildFilterString(): string {
    let filterString: string = '';

    this.queryFilters.forEach((filter: QueryFilter) => {
      filterString += filter.caption + '|';

      for (let i = 0; i < filter.options.length; i++) {
        filterString += filter.options[i].id;
        if (i + 1 < filter.options.length) {
          filterString += ',';
        } else {
          filterString += '|';
        }
      }
    });

    return encodeURIComponent(filterString);
  }


  updateUrl() {
    let filterString = this.buildFilterString();

    let params: Params = {
      filters: filterString != '' ? filterString : null,
      page: null
    }

    this.router.navigate([location.pathname], { queryParams: params, queryParamsHandling: 'merge' });
    this.urlUpdated = true;
  }
}