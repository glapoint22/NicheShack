import { Component, Input, ViewChild } from '@angular/core';
import { Query, QueryType } from 'classes/query';
import { QueryableWidget } from 'classes/queryable-widget';
import { QueryService } from '../../../services/query.service';
import { QueryListComponent } from './query-list/query-list.component';

@Component({
  selector: 'query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.scss']
})
export class QueryBuilderComponent {
  constructor(private queryService: QueryService) { }
  private queries: Array<Query>;
  @ViewChild('queryList', { static: false }) queryList: QueryListComponent;
  @Input() queryableWidget: QueryableWidget;

  ngAfterViewInit() {
    this.queryService.getDropdownLists();

    this.queryService.onDropdownListsLoaded.subscribe(() => {
      if(this.queryableWidget.queryParams.queries) {
        this.queryList.load(this.queryableWidget.queryParams.queries);
      }
    });
  }


  getProducts() {
    this.queries = [];
    this.getQueryRows(this.queryList);
    this.queryableWidget.query(this.queries);
  }


  getQueryRows(queryList: QueryListComponent) {
    // Loop through all the queryrows of this query builder
    queryList.queryRows.forEach(x => {

      // Allow each queryrow to update the queries array accordingly
      x.setQuery(this.queries);

      // If we come across a subquery queryrow
      if (x.queryType == QueryType.SubQuery) {

        // Call this method on the subquery queryrow that will loop through all of its queryrows
        x.getQueryRows(x.subQueryRows);
      }
    })
  }
}