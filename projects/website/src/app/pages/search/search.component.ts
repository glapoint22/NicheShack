import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'services/data.service';
import { Filters } from '../../classes/filters';
import { ProductResults } from '../../classes/product-results';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public filters: Filters;
  public products: Array<Product>;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      let parameters = Object.keys(params).map(key => ({
        key: key,
        value: params[key]
      }));
      
      this.dataService.get('api/Products', parameters)
        .subscribe((productResults: ProductResults) => {
          this.filters = productResults.filters;
          this.products = productResults.products;
        })
    });
  }

}
