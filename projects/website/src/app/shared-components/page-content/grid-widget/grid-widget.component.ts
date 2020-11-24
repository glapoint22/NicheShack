import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Filters } from 'classes/filters';
import { Product } from 'classes/product';
import { ProductResults } from 'classes/product-results';
import { DataService } from 'services/data.service';
import { WidgetComponent } from '../widget/widget.component';


@Component({
  selector: 'grid-widget',
  templateUrl: './grid-widget.component.html',
  styleUrls: ['./grid-widget.component.scss']
})
export class GridWidgetComponent extends WidgetComponent {
  public filters: Filters;
  public products: Array<Product>;
  public page: number = 1;
  public pageCount: number;
  public sortOptions: Array<KeyValue<string, string>>;
  public selectedSortOption: KeyValue<string, string>;
  public totalProducts: number;
  public productCountStart: number;
  public productCountEnd: number;
  public showFilterMenu: boolean;
  public query: string;

  
  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {super()}

  ngOnInit() {
    // this.route.queryParamMap.subscribe((params: ParamMap) => {
    //   let parameters = params.keys.map(key => ({
    //     key: key,
    //     value: params.get(key)
    //   }));

      
    //   this.query = params.get('query');

    //   this.page = params.has('page') ? Math.max(1, Number.parseInt(params.get('page'))) : 1;

    //   this.dataService.get('api/Products', parameters)
    //     .subscribe((productResults: ProductResults) => {
    //       this.sortOptions = productResults.sortOptions.map(x => ({
    //         key: x.Key,
    //         value: x.Value
    //       }));
          
  
    //       let index = Math.max(0, this.sortOptions.findIndex(x => x.value == this.route.snapshot.queryParams['sort']));
    //       this.selectedSortOption = this.sortOptions[index];


    //       this.filters = productResults.filters;
    //       this.products = productResults.products;
    //       this.pageCount = productResults.pageCount;
    //       this.totalProducts = productResults.totalProducts;
    //       this.productCountStart = productResults.productCountStart;
    //       this.productCountEnd = productResults.productCountEnd;
    //     });
    // });
  }

  setSort() {
    this.router.navigate([], {
      queryParams: { sort: this.selectedSortOption.value, page: null },
      queryParamsHandling: 'merge'
    });
  }


  getDefaultIndex() {
    // Used to display the defulat selection
    if (this.sortOptions) return this.sortOptions.findIndex(x => x == this.selectedSortOption);
    return {};
  }
  

}
