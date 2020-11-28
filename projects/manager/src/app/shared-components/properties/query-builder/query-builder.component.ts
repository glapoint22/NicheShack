import { Component, Input, ViewChild } from '@angular/core';
import { Query, QueryType } from 'classes/query';
import { QueryableWidget } from 'classes/queryable-widget';
import { DataService } from 'services/data.service';
import { QueryService } from '../../../services/query.service';
import { QueryListComponent } from './query-list/query-list.component';

@Component({
  selector: 'query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.scss']
})
export class QueryBuilderComponent {
  @ViewChild('queryList', { static: false }) queryList: QueryListComponent;
  @Input() queryableWidget: QueryableWidget;
  public queries: Array<Query> = [];
  


  constructor(private queryService: QueryService, private dataService: DataService) {
    if (this.queryService.categories.length == 0) this.queryService.getCategories();
    if (this.queryService.subgroups.length == 0) this.queryService.getSubgroups();
  }


  getProducts() {
    this.queries = [];
    this.getQueryRows(this.queryList);

    if (this.queries.length > 0) {
      this.queryableWidget.query(this.queries);
      // this.queryService.productResultsInProgress = true;
      
      
      // this.dataService.post('api/Products/Alita', this.queries)
      //   .subscribe((productResults: ProductResults) => {
      //     this.queryableWidget.products = productResults.products;

      //     this.queryService.productResultsInProgress = false;
      //     this.queryService.results = products.length;
      //     console.log(products)
      //   });



    } else {
      this.queryService.results = 0;
    }

    
  }


  getQueryRows(queryList: QueryListComponent) {
    queryList.queryRows.forEach(x => {

      x.setQuery(this.queries);

      if (x.queryType == QueryType.SubQuery) {
        x.getQueryRows(x.subQueryRows);
      }
    })
  }
}