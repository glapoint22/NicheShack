import { Component, ViewChild } from '@angular/core';
import { Query, QueryType } from '../../../classes/query';
import { QueryService } from '../../../services/query.service';
import { QueryListComponent } from './query-list/query-list.component';

@Component({
  selector: 'query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.scss']
})
export class QueryBuilderComponent {
  constructor(public queryService: QueryService) {
    if (this.queryService.categories.length == 0) this.queryService.getCategories();
    if (this.queryService.subgroups.length == 0) this.queryService.getSubgroups();
  }
  public queries: Array<Query> = [];
  @ViewChild('queryList', { static: false }) queryList: QueryListComponent;


  getProducts() {
    this.queries = [];
    this.getQueryRows(this.queryList);

    console.log(this.queries)
  }


  getQueryRows(queryList: QueryListComponent) {
    queryList.queryRows.forEach(x => {

     x.setQuery();

      if(x.queryType == QueryType.SubQuery) {
        x.getQueryRows(x.subQueryRows);
      }
    })
  }
}