import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'services/data.service';
import { OperatorType, Query, IQueryRow, CategoryQueryRow, ProductCreationDateQueryRow, FeaturedProductsQueryRow, ProductKeywordsQueryRow, NicheQueryRow, QueryRowNone, ProductPriceQueryRow, ProductRatingQueryRow, CustomerRelatedProductsQueryRow, ProductSubgroupQueryRow, ValueType, SubQueryRow, QueryType } from '../../../../classes/query';
import { QueryService } from '../../../../services/query.service';

@Component({
  selector: 'query-list',
  templateUrl: './query-list.component.html',
  styleUrls: ['./query-list.component.scss']
})
export class QueryListComponent implements OnInit {
  constructor(public queryService: QueryService, private dataService: DataService) { }

  // Public
  public queryRows: Array<IQueryRow> = [];
  public operatorType = OperatorType;
  public valueType = ValueType;
  public queryType = QueryType;
  public queries: Array<Query> = [];

  @Input() isSubQuery: boolean;
  @Output() onSubQueryDelete: EventEmitter<void> = new EventEmitter();
  @Output() subQueryRows: EventEmitter<Array<IQueryRow>> = new EventEmitter();
  

  public whereList: Array<KeyValue<any, IQueryRow>> = [
    { key: "None", value: new QueryRowNone(0, this.queryRows, this.queries, this.dataService, this.queryService) },
    { key: "Category", value: new CategoryQueryRow(1, this.queryRows, this.queries, this.dataService, this.queryService) },
    { key: "Niche", value: new NicheQueryRow(2, this.queryRows, this.queries, this.dataService, this.queryService) },
    { key: "Subgroup", value: new ProductSubgroupQueryRow(3, this.queryRows, this.queries, this.dataService, this.queryService) },
    { key: "Featured Products", value: new FeaturedProductsQueryRow(4, this.queryRows, this.queries, this.dataService, this.queryService) },
    { key: "Customer Related", value: new CustomerRelatedProductsQueryRow(5, this.queryRows, this.queries, this.dataService, this.queryService) },
    { key: "Price", value: new ProductPriceQueryRow(6, this.queryRows, this.queries, this.dataService, this.queryService) },
    { key: "Rating", value: new ProductRatingQueryRow(7, this.queryRows, this.queries, this.dataService, this.queryService) },
    { key: "Keywords", value: new ProductKeywordsQueryRow(8, this.queryRows, this.queries, this.dataService, this.queryService) },
    { key: "Creation Date", value: new ProductCreationDateQueryRow(9, this.queryRows, this.queries, this.dataService, this.queryService) }
  ];


  public operatorList: Array<KeyValue<any, any>> = [
    { key: "=", value: OperatorType.Equals },
    { key: ">", value: OperatorType.GreaterThan },
    { key: ">=", value: OperatorType.GreaterThanOrEqualTo },
    { key: "<", value: OperatorType.LessThan },
    { key: "<=", value: OperatorType.LessThanOrEqualTo }
  ];


  public logicalOperatorList: Array<KeyValue<any, any>> = [
    { key: "And", value: 0 },
    { key: "Or", value: 1 }
  ];


  ngOnInit() {
    this.subQueryRows.emit(this.queryRows);
  }



  onQueryAdd() {
    this.queryRows.push(new QueryRowNone(0, this.queryRows, this.queries, this.dataService, this.queryService));
  }


  onSubQueryAdd() {
    this.queryRows.push(new SubQueryRow(null, this.queryRows, this.queries, this.dataService, this.queryService));
  }

  subQueryDelete() {
    this.onSubQueryDelete.emit();
  }
}
