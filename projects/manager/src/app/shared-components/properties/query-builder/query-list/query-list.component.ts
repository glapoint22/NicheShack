import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ComparisonOperatorType, LogicalOperatorType, QueryType } from 'classes/query';
import { IQueryRow, CategoryQueryRow, ProductCreationDateQueryRow, FeaturedProductsQueryRow, ProductKeywordsQueryRow, NicheQueryRow, QueryRowNone, ProductPriceQueryRow, ProductRatingQueryRow, CustomerRelatedProductsQueryRow, ProductSubgroupQueryRow, ValueType, SubQueryRow } from '../../../../classes/query';
import { QueryService } from '../../../../services/query.service';
import { QueryBuilderComponent } from '../query-builder.component';

@Component({
  selector: 'query-list',
  templateUrl: './query-list.component.html',
  styleUrls: ['./query-list.component.scss']
})
export class QueryListComponent implements OnInit, OnChanges {
  constructor(public queryService: QueryService) { }

  // Public
  public queryRows: Array<IQueryRow> = [];
  public ComparisonOperatorType = ComparisonOperatorType;
  public valueType = ValueType;
  public queryType = QueryType;
  public whereList: Array<KeyValue<any, IQueryRow>>;

  @Input() queryBuilder: QueryBuilderComponent;
  @Input() isSubQuery: boolean;
  @Output() onSubQueryDelete: EventEmitter<void> = new EventEmitter();
  @Output() subQueryRows: EventEmitter<Array<IQueryRow>> = new EventEmitter();


  public operatorList: Array<KeyValue<any, any>> = [
    { key: "=", value: ComparisonOperatorType.Equal },
    { key: "!=", value: ComparisonOperatorType.NotEqual },
    { key: ">", value: ComparisonOperatorType.GreaterThan },
    { key: ">=", value: ComparisonOperatorType.GreaterThanOrEqual },
    { key: "<", value: ComparisonOperatorType.LessThan },
    { key: "<=", value: ComparisonOperatorType.LessThanOrEqual }
  ];


  public logicalOperatorList: Array<KeyValue<any, any>> = [
    { key: "And", value: LogicalOperatorType.And },
    { key: "Or", value: LogicalOperatorType.Or }
  ];


  ngOnInit() {
    this.subQueryRows.emit(this.queryRows);
  }


  // -----------------------------( NG ON CHANGES )------------------------------ \\
  ngOnChanges(changes: SimpleChanges) {
    if (changes['queryBuilder']) {

      this.whereList = [
        { key: "None", value: new QueryRowNone(0, this.queryBuilder, this.queryRows) },
        { key: "Category", value: new CategoryQueryRow(1, this.queryBuilder, this.queryRows, this.queryService) },
        { key: "Niche", value: new NicheQueryRow(2, this.queryBuilder, this.queryRows, this.queryService) },
        { key: "Subgroup", value: new ProductSubgroupQueryRow(3, this.queryBuilder, this.queryRows, this.queryService) },
        { key: "Featured Products", value: new FeaturedProductsQueryRow(4, this.queryBuilder, this.queryRows) },
        { key: "Customer Related", value: new CustomerRelatedProductsQueryRow(5, this.queryBuilder, this.queryRows, this.queryService) },
        { key: "Price", value: new ProductPriceQueryRow(6, this.queryBuilder, this.queryRows) },
        { key: "Rating", value: new ProductRatingQueryRow(7, this.queryBuilder, this.queryRows, this.queryService) },
        { key: "Keywords", value: new ProductKeywordsQueryRow(8, this.queryBuilder, this.queryRows) },
        { key: "Creation Date", value: new ProductCreationDateQueryRow(9, this.queryBuilder, this.queryRows) }
      ];
    }
  }



  onQueryAdd() {
    this.queryRows.push(new QueryRowNone(0, this.queryBuilder, this.queryRows));
  }


  onSubQueryAdd() {
    this.queryRows.push(new SubQueryRow(null, this.queryBuilder, this.queryRows));
  }

  subQueryDelete() {
    this.onSubQueryDelete.emit();
  }
}
