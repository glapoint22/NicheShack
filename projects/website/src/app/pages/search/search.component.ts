import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Product } from 'classes/product';
import { DataService } from 'services/data.service';
import { Filters } from '../../../../../../classes/filters';
import { ProductResults } from '../../../../../../classes/product-results';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  // public filters: Filters;
  // public products: Array<Product>;
  // public page: number = 1;
  // public pageCount: number;
  // public sortOptions: Array<KeyValue<string, string>>;
  // public selectedSortOption: KeyValue<string, string>;
  // public totalProducts: number;
  // public start: number;
  // public end: number;
  // public showFilterMenu: boolean;

  // constructor(public route: ActivatedRoute, private dataService: DataService, private router: Router) { }

  // ngOnInit() {
  //   this.route.queryParamMap.subscribe((params: ParamMap) => {
  //     let parameters = params.keys.map(key => ({
  //       key: key,
  //       value: params.get(key)
  //     }));

      

  //     this.page = params.has('page') ? Math.max(1, Number.parseInt(params.get('page'))) : 1;

  //     this.dataService.get('api/Products', parameters)
  //       .subscribe((productResults: ProductResults) => {
  //         this.sortOptions = productResults.sortOptions.map(x => ({
  //           key: x.Key,
  //           value: x.Value
  //         }));
          
  
  //         let index = Math.max(0, this.sortOptions.findIndex(x => x.value == this.route.snapshot.queryParams['sort']));
  //         this.selectedSortOption = this.sortOptions[index];


  //         this.filters = productResults.filters;
  //         this.products = productResults.products;
  //         this.pageCount = productResults.pageCount;
  //         this.totalProducts = productResults.totalProducts;
  //         this.start = productResults.start;
  //         this.end = productResults.end;
  //       });
  //   });
  // }

  // setSort() {
  //   this.router.navigate([], {
  //     queryParams: { sort: this.selectedSortOption.value, page: null },
  //     queryParamsHandling: 'merge'
  //   });
  // }
}
