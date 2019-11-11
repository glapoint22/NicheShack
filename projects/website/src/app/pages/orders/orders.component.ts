import { Component, OnInit, Inject } from '@angular/core';
import { PageComponent } from '../page/page.component';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT, KeyValue } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from 'services/data.service';
import { ProductOrder } from '../../interfaces/product-order';
import { OrderProductQueryResult } from '../../interfaces/order-product-query-result';

@Component({
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent extends PageComponent implements OnInit {
  public searchwords: string;
  public displayType: string;
  public orders: Array<ProductOrder>;
  public filter: Array<KeyValue<string, string>>;
  public count: number;
  public selectedFilter: KeyValue<string, string>;
  public products: Array<OrderProductQueryResult>;
  public queryParams: ParamMap;
  public viewOrderDetails: boolean;
  public currentViewedOrderIndex: number = -1;
  public showFilterMenu: boolean;

  constructor(
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document: Document,
    private dataService: DataService,
    private router: Router,
    public route: ActivatedRoute,
  ) { super(titleService, metaService, document) }

  ngOnInit() {
    // Set the page properties
    this.title = 'Your Orders';
    this.share = false;
    super.ngOnInit();

    this.route.queryParamMap.subscribe((queryParams: ParamMap) => {
      // Parameters we will pass to the server
      let parameters: Array<KeyValue<string, string>> = [];

      this.queryParams = queryParams;

      // The search words for searching orders
      this.searchwords = queryParams.get('search');
      // if (this.searchInput) this.searchInput.nativeElement.value = this.search;

      // Get all the query params from the url and assign it to the parameters array
      for (let i = 0; i < queryParams.keys.length; i++) {
        parameters.push({ key: queryParams.keys[i], value: queryParams.get(queryParams.keys[i]) });
      }

      // Get orders or products from the database
      this.dataService
        .get('api/ProductOrders', parameters)
        .subscribe(response => {
          // Display type will be either "order" or "Product"
          // This is based on what is searched in the search input box
          this.displayType = response.displayType;

          // Display orders
          if (this.displayType == 'order') {
            this.orders = response.orders;

            if (response.filters) {
              this.filter = response.filters.map(x => ({
                key: x.Key,
                value: x.Value
              }));
            }


            this.count = this.orders.length;
          } else {
            // Display products
            this.products = response.products;
            this.count = this.products.length;
          }

          this.setSelectedFilter();
        });
    });
  }

  setSelectedFilter() {
    // Set the time span filter based on the selected filter (ex. "Last 30 days")
    if (this.filter) {
      let index = Math.max(0, this.filter.findIndex(x => x.key == this.queryParams.get('filter')));
      this.selectedFilter = this.filter[index];
    }
  }

  getDefaultIndex() {
    // Used to display the defulat selection in the popup button
    if (this.filter) return this.filter.findIndex(x => x == this.selectedFilter);
    return {};
  }



  onSearch() {
    // Get orders or products based on the search words
    if (this.searchwords && this.searchwords.length > 0) {
      this.router.navigate([location.pathname], {
        queryParams: { 'search': this.searchwords }
      });
    }
  }

  onFilterClick(item) {
    // A new time span has been selected. (ex. "Last 30 days")
    this.selectedFilter = item;

    // Get orders based on the time span
    this.router.navigate([location.pathname], {
      queryParams: { 'filter': this.selectedFilter.key }
    });
  }


  onBuyAgainClick(hoplink) {
    // Navigate to the product page
    window.location.href = hoplink;
  }
}