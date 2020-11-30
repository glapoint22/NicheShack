import { Component, Input, ViewChild } from '@angular/core';
import { LogicalOperatorType, Query, QueryType } from 'classes/query';
import { QueryableWidget } from 'classes/queryable-widget';
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


  public queryRows = [

    
    {
      queryType: QueryType.Category,
      value: 1,
      logicalOperator: LogicalOperatorType.And
    },

    {
      queryType: QueryType.Niche,
      value: 3,
      logicalOperator: LogicalOperatorType.And
    },

    {
      queryType: QueryType.SubQuery,
      logicalOperator: LogicalOperatorType.Or,
      value: [{
        queryType: QueryType.Category,
        value: 2
      }]
    },

    {
      queryType: QueryType.ProductSubgroup,
      value: 4,
      logicalOperator: LogicalOperatorType.Or
    },

    {
      queryType: QueryType.CustomerRelatedProducts,
      value: 1,
      logicalOperator: LogicalOperatorType.Or
    },

    {
      queryType: QueryType.ProductRating,
      value: 3,
      logicalOperator: LogicalOperatorType.And,
      comparisonOperator: 2
    },

    {
      queryType: QueryType.ProductPrice,
      wholeNumberValue: "5",
      decimalValue: "22",
      logicalOperator: LogicalOperatorType.And,
      comparisonOperator: 3
    },

    {
      queryType: QueryType.FeaturedProducts,
      value: [
        {
          name: "Featured"
        },

        {
          name: "Products"
        }
      ],
      logicalOperator: LogicalOperatorType.Or
    },

    {
      queryType: QueryType.ProductKeywords,
      value: [
        {
          name: "Product"
        },

        {
          name: "Key"
        },

        {
          name: "Words"
        }
      ],
      logicalOperator: LogicalOperatorType.Or
    },


    {
      queryType: QueryType.ProductCreationDate,
      value: "2020-05-22",
      logicalOperator: LogicalOperatorType.And,
      comparisonOperator: 2
    }




  ];



  constructor(private queryService: QueryService) {
    if (this.queryService.categories.length == 0) this.queryService.getCategories();
    if (this.queryService.subgroups.length == 0) this.queryService.getSubgroups();
  }





  ngAfterViewInit() {
    window.setTimeout(() => {


      this.queryList.setQueryRows(this.queryRows);

    }, 1000)

  }


  getProducts() {
    this.queries = [];
    this.getQueryRows(this.queryList);

    if (this.queries.length > 0) {
      this.queryableWidget.query(this.queries);

    } else {

      this.queries.push({
        comparisonOperator: 0,
        intValue: 0,
        logicalOperator: 0,
        queryType: 0
      });

      this.queryableWidget.query(this.queries);
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