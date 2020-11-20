import { Component } from '@angular/core';
import { QueryType } from '../../../classes/query';
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


  getQuery(queryList: QueryListComponent) {
    queryList.queryRows.forEach(x => {

      console.log(x)

      if(x.queryType == QueryType.SubQuery) {
        console.log(x.subQueryRows)
      }
    })
  }
}