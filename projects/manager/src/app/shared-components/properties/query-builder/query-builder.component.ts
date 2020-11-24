import { Component, ViewChild } from '@angular/core';
import { DataService } from 'services/data.service';
import { Query, QueryType } from '../../../classes/query';
import { QueryService } from '../../../services/query.service';
import { QueryListComponent } from './query-list/query-list.component';

@Component({
  selector: 'query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.scss']
})
export class QueryBuilderComponent {
  constructor(private queryService: QueryService, private dataService: DataService) {
    if (this.queryService.categories.length == 0) this.queryService.getCategories();
    if (this.queryService.subgroups.length == 0) this.queryService.getSubgroups();
  }
  public queries: Array<Query> = [];
  @ViewChild('queryList', { static: false }) queryList: QueryListComponent;


  getProducts() {
    this.queries = [];
    this.getQueryRows(this.queryList);

    // if (this.queries.length > 0) {
    //   this.queryService.productResultsInProgress = true;
    //   this.dataService.post('api/Products/Alita', this.queries)
    //     .subscribe((products) => {
    //       this.queryService.productResultsInProgress = false;
    //       this.queryService.results = products.length;
    //       console.log(products)
    //     });
    // } else {
    //   this.queryService.results = 0;
    // }

    console.log(this.queries)
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