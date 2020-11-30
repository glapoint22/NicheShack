import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ComparisonOperatorType, LogicalOperatorType, QueryType } from 'classes/query';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { IQueryRow, CategoryQueryRow, ProductCreationDateQueryRow, FeaturedProductsQueryRow, ProductKeywordsQueryRow, NicheQueryRow, QueryRowNone, ProductPriceQueryRow, ProductRatingQueryRow, CustomerRelatedProductsQueryRow, ProductSubgroupQueryRow, ValueType, SubQueryRow } from '../../../../classes/query';
import { QueryService } from '../../../../services/query.service';
import { QueryBuilderComponent } from '../query-builder.component';

@Component({
  selector: 'query-list',
  templateUrl: './query-list.component.html',
  styleUrls: ['./query-list.component.scss']
})
export class QueryListComponent implements OnInit, OnChanges {
  constructor(public queryService: QueryService, private popupService: PopupService) { }

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
  @ViewChild('queryList', { static: false }) queryList: QueryListComponent;


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


  // -----------------------------( NG ON INIT )------------------------------ \\
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
        { key: "Featured Products", value: new FeaturedProductsQueryRow(4, this.queryBuilder, this.queryRows, this.popupService) },
        { key: "Customer Related", value: new CustomerRelatedProductsQueryRow(5, this.queryBuilder, this.queryRows, this.queryService) },
        { key: "Price", value: new ProductPriceQueryRow(6, this.queryBuilder, this.queryRows) },
        { key: "Rating", value: new ProductRatingQueryRow(7, this.queryBuilder, this.queryRows, this.queryService) },
        { key: "Keywords", value: new ProductKeywordsQueryRow(8, this.queryBuilder, this.queryRows) },
        { key: "Creation Date", value: new ProductCreationDateQueryRow(9, this.queryBuilder, this.queryRows) }
      ];
    }
  }



  setQueryRows(queryRows: Array<any>) {

    queryRows.forEach(x => {

      if (x.queryType == QueryType.Category) {
        this.queryRows.push(new CategoryQueryRow(1, this.queryBuilder, this.queryRows, this.queryService));
        this.queryRows[this.queryRows.length - 1].dropdownValue = x.value;
        this.queryRows[this.queryRows.length - 1].logicalOperator = x.logicalOperator;
        this.queryRows[this.queryRows.length - 1].setQueryRow(this.queryRows.length - 1);
      }


      if (x.queryType == QueryType.Niche) {
        this.queryRows.push(new NicheQueryRow(2, this.queryBuilder, this.queryRows, this.queryService));
        this.queryRows[this.queryRows.length - 1].dropdownValue = x.value;
        this.queryRows[this.queryRows.length - 1].logicalOperator = x.logicalOperator;
        this.queryRows[this.queryRows.length - 1].setQueryRow(this.queryRows.length - 1);
      }


      if (x.queryType == QueryType.ProductSubgroup) {
        this.queryRows.push(new ProductSubgroupQueryRow(3, this.queryBuilder, this.queryRows, this.queryService));
        this.queryRows[this.queryRows.length - 1].dropdownValue = x.value;
        this.queryRows[this.queryRows.length - 1].logicalOperator = x.logicalOperator;
        this.queryRows[this.queryRows.length - 1].setQueryRow(this.queryRows.length - 1);
      }


      if (x.queryType == QueryType.CustomerRelatedProducts) {
        this.queryRows.push(new CustomerRelatedProductsQueryRow(5, this.queryBuilder, this.queryRows, this.queryService));
        this.queryRows[this.queryRows.length - 1].dropdownValue = x.value;
        this.queryRows[this.queryRows.length - 1].logicalOperator = x.logicalOperator;
        this.queryRows[this.queryRows.length - 1].setQueryRow(this.queryRows.length - 1);
      }


      if (x.queryType == QueryType.ProductRating) {
        this.queryRows.push(new ProductRatingQueryRow(7, this.queryBuilder, this.queryRows, this.queryService));
        this.queryRows[this.queryRows.length - 1].dropdownValue = x.value;
        this.queryRows[this.queryRows.length - 1].logicalOperator = x.logicalOperator;
        this.queryRows[this.queryRows.length - 1].comparisonOperator = x.comparisonOperator;
        this.queryRows[this.queryRows.length - 1].setQueryRow(this.queryRows.length - 1);
      }

      if (x.queryType == QueryType.ProductPrice) {
        this.queryRows.push(new ProductPriceQueryRow(6, this.queryBuilder, this.queryRows));
        this.queryRows[this.queryRows.length - 1].setPrice(x.wholeNumberValue, x.decimalValue)
        this.queryRows[this.queryRows.length - 1].logicalOperator = x.logicalOperator;
        this.queryRows[this.queryRows.length - 1].comparisonOperator = x.comparisonOperator;
        this.queryRows[this.queryRows.length - 1].setQueryRow(this.queryRows.length - 1);
      }


      if (x.queryType == QueryType.FeaturedProducts) {
        this.queryRows.push(new FeaturedProductsQueryRow(4, this.queryBuilder, this.queryRows, this.popupService));
          this.queryRows[this.queryRows.length - 1].setItemList(x.value);
          this.queryRows[this.queryRows.length - 1].logicalOperator = x.logicalOperator;
          this.queryRows[this.queryRows.length - 1].setQueryRow(this.queryRows.length - 1);
      }

      if (x.queryType == QueryType.ProductKeywords) {
        this.queryRows.push(new ProductKeywordsQueryRow(8, this.queryBuilder, this.queryRows));
          this.queryRows[this.queryRows.length - 1].setItemList(x.value);
          this.queryRows[this.queryRows.length - 1].logicalOperator = x.logicalOperator;
          this.queryRows[this.queryRows.length - 1].setQueryRow(this.queryRows.length - 1);
      }

      if (x.queryType == QueryType.ProductCreationDate) {
        this.queryRows.push(new ProductCreationDateQueryRow(9, this.queryBuilder, this.queryRows));
        this.queryRows[this.queryRows.length - 1].setDate(x.value);
        this.queryRows[this.queryRows.length - 1].logicalOperator = x.logicalOperator;
        this.queryRows[this.queryRows.length - 1].comparisonOperator = x.comparisonOperator;
        this.queryRows[this.queryRows.length - 1].setQueryRow(this.queryRows.length - 1);
      }



      if (x.queryType == QueryType.SubQuery) {
        this.queryRows.push(new SubQueryRow(null, this.queryBuilder, this.queryRows));
        this.queryRows[this.queryRows.length - 1].logicalOperator = x.logicalOperator;
        window.setTimeout(() => {
          this.queryList.setQueryRows(x.value);
        })
      }
    })
  }






  // -----------------------------( ON QUERY ADD )------------------------------ \\
  onQueryAdd() {
    this.queryRows.push(new QueryRowNone(0, this.queryBuilder, this.queryRows));
  }


  // -----------------------------( ON SUB QUERY ADD )------------------------------ \\
  onSubQueryAdd() {
    this.queryRows.push(new SubQueryRow(null, this.queryBuilder, this.queryRows));
  }


  // -----------------------------( SUB QUERY DELETE )------------------------------ \\
  subQueryDelete() {
    this.onSubQueryDelete.emit();
  }
}