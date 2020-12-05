import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ComparisonOperatorType, LogicalOperatorType, Query, QueryType } from 'classes/query';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { IQueryRow, CategoryQueryRow, ProductCreationDateQueryRow, FeaturedProductsQueryRow, ProductKeywordsQueryRow, NicheQueryRow, QueryRowNone, ProductPriceQueryRow, ProductRatingQueryRow, CustomerRelatedProductsQueryRow, ProductSubgroupQueryRow, ValueType, SubQueryRow } from '../../../../classes/query';
import { QueryService } from '../../../../services/query.service';
import { QueryBuilderComponent } from '../query-builder.component';

@Component({
  selector: 'query-list',
  templateUrl: './query-list.component.html',
  styleUrls: ['./query-list.component.scss']
})
export class QueryListComponent implements OnInit {
  constructor(public queryService: QueryService, private popupService: PopupService) { }

  // Public
  public queryRows: Array<IQueryRow> = [];
  public ComparisonOperatorType = ComparisonOperatorType;
  public valueType = ValueType;
  public queryType = QueryType;

  @Input() isSubQuery: boolean;
  @Input() queryBuilder: QueryBuilderComponent;
  @Output() onSubQueryDelete: EventEmitter<void> = new EventEmitter();
  @ViewChild('queryList', { static: false }) queryList: QueryListComponent;
  @Output() subQueryRows: EventEmitter<Array<IQueryRow>> = new EventEmitter();


  public whereList: Array<KeyValue<any, number>> = [
    { key: "None", value: QueryType.None },
    { key: "Category", value: QueryType.Category },
    { key: "Niche", value: QueryType.Niche },
    { key: "Subgroup", value: QueryType.ProductSubgroup },
    { key: "Featured Products", value: QueryType.FeaturedProducts },
    { key: "Customer Related", value: QueryType.CustomerRelatedProducts },
    { key: "Price", value: QueryType.ProductPrice },
    { key: "Rating", value: QueryType.ProductRating },
    { key: "Keywords", value: QueryType.ProductKeywords },
    { key: "Creation Date", value: QueryType.ProductCreationDate }
  ];

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


  // -----------------------------( LOAD )------------------------------ \\
  load(queryRows: Array<Query>) {
    queryRows.forEach((x, queryRowIndex) => {
      this.buildQueryRow(queryRowIndex, x.queryType, x)
    });
  }


  // -----------------------------( LOAD )------------------------------ \\
  buildQueryRow(queryRowIndex: number, queryType: QueryType, queryRow?: Query) {
    switch (queryType) {

      // None
      case QueryType.None: {
        this.queryRows[queryRowIndex] = new QueryRowNone(0, this.queryBuilder, this.queryRows);
        break;
      }

      // Category
      case QueryType.Category: {
        this.queryRows[queryRowIndex] = new CategoryQueryRow(1, this.queryBuilder, this.queryRows, this.queryService);
        if (queryRow != null) {
          this.queryRows[queryRowIndex].dropdownValue = queryRow.intValue;
          this.queryRows[queryRowIndex].logicalOperator = queryRow.logicalOperator;
          this.queryRows[queryRowIndex].logicalOperatorDropdownSelectedIndex = queryRow.logicalOperator - 1;
        }
        this.queryRows[queryRowIndex].setQueryRow(queryRowIndex);
        break;
      }

      // Niche
      case QueryType.Niche: {
        this.queryRows[queryRowIndex] = new NicheQueryRow(2, this.queryBuilder, this.queryRows, this.queryService);
        if (queryRow != null) {
          this.queryRows[queryRowIndex].dropdownValue = queryRow.intValue;
          this.queryRows[queryRowIndex].logicalOperator = queryRow.logicalOperator;
          this.queryRows[queryRowIndex].logicalOperatorDropdownSelectedIndex = queryRow.logicalOperator - 1;
        }
        this.queryRows[queryRowIndex].setQueryRow(queryRowIndex);
        break;
      }

      // Subgroup
      case QueryType.ProductSubgroup: {
        this.queryRows[queryRowIndex] = new ProductSubgroupQueryRow(3, this.queryBuilder, this.queryRows, this.queryService);
        if (queryRow != null) {
          this.queryRows[queryRowIndex].dropdownValue = queryRow.intValue;
          this.queryRows[queryRowIndex].logicalOperator = queryRow.logicalOperator;
          this.queryRows[queryRowIndex].logicalOperatorDropdownSelectedIndex = queryRow.logicalOperator - 1;
        }
        this.queryRows[queryRowIndex].setQueryRow(queryRowIndex);
        break;
      }

      // Featured Products
      case QueryType.FeaturedProducts: {
        this.queryRows[queryRowIndex] = new FeaturedProductsQueryRow(4, this.queryBuilder, this.queryRows, this.popupService, "Product", "Products", "api/Products/QueryBuilder");
        if (queryRow != null) {
          this.queryRows[queryRowIndex].setItemList(queryRow.stringValues, queryRow.intValues);
          this.queryRows[queryRowIndex].logicalOperator = queryRow.logicalOperator;
          this.queryRows[queryRowIndex].logicalOperatorDropdownSelectedIndex = queryRow.logicalOperator - 1;
        }
        this.queryRows[queryRowIndex].setQueryRow(queryRowIndex);
        break;
      }

      // Customer Related Products
      case QueryType.CustomerRelatedProducts: {
        this.queryRows[queryRowIndex] = new CustomerRelatedProductsQueryRow(5, this.queryBuilder, this.queryRows, this.queryService);
        if (queryRow != null) {
          this.queryRows[queryRowIndex].dropdownValue = queryRow.intValue;
          this.queryRows[queryRowIndex].logicalOperator = queryRow.logicalOperator;
          this.queryRows[queryRowIndex].logicalOperatorDropdownSelectedIndex = queryRow.logicalOperator - 1;
        }
        this.queryRows[queryRowIndex].setQueryRow(queryRowIndex);
        break;
      }

      // Price
      case QueryType.ProductPrice: {
        this.queryRows[queryRowIndex] = new ProductPriceQueryRow(6, this.queryBuilder, this.queryRows);
        if (queryRow != null) {
          this.queryRows[queryRowIndex].setPrice(queryRow.stringValue)
          this.queryRows[queryRowIndex].logicalOperator = queryRow.logicalOperator;
          this.queryRows[queryRowIndex].logicalOperatorDropdownSelectedIndex = queryRow.logicalOperator - 1;
          this.queryRows[queryRowIndex].comparisonOperator = queryRow.comparisonOperator;
          this.queryRows[queryRowIndex].comparisonOperatorDropdownSelectedIndex = queryRow.comparisonOperator - 1;
        }
        this.queryRows[queryRowIndex].setQueryRow(queryRowIndex);
        break;
      }

      // Rating
      case QueryType.ProductRating: {
        this.queryRows[queryRowIndex] = new ProductRatingQueryRow(7, this.queryBuilder, this.queryRows, this.queryService);
        if (queryRow != null) {
          this.queryRows[queryRowIndex].dropdownValue = queryRow.doubleValue;
          this.queryRows[queryRowIndex].logicalOperator = queryRow.logicalOperator;
          this.queryRows[queryRowIndex].logicalOperatorDropdownSelectedIndex = queryRow.logicalOperator - 1;
          this.queryRows[queryRowIndex].comparisonOperator = queryRow.comparisonOperator;
          this.queryRows[queryRowIndex].comparisonOperatorDropdownSelectedIndex = queryRow.comparisonOperator - 1;
        }
        this.queryRows[queryRowIndex].setQueryRow(queryRowIndex);
        break;
      }

      // Keywords
      case QueryType.ProductKeywords: {
        this.queryRows[queryRowIndex] = new ProductKeywordsQueryRow(8, this.queryBuilder, this.queryRows, this.popupService, "Keyword", "Keywords", "api/Products/Keywords");
        if (queryRow != null) {
          this.queryRows[queryRowIndex].setItemList(queryRow.stringValues, queryRow.intValues);
          this.queryRows[queryRowIndex].logicalOperator = queryRow.logicalOperator;
          this.queryRows[queryRowIndex].logicalOperatorDropdownSelectedIndex = queryRow.logicalOperator - 1;
        }
        this.queryRows[queryRowIndex].setQueryRow(queryRowIndex);
        break;
      }

      // Date
      case QueryType.ProductCreationDate: {
        this.queryRows[queryRowIndex] = new ProductCreationDateQueryRow(9, this.queryBuilder, this.queryRows);
        if (queryRow != null) {
          this.queryRows[queryRowIndex].setDate(queryRow.stringValue);
          this.queryRows[queryRowIndex].logicalOperator = queryRow.logicalOperator;
          this.queryRows[queryRowIndex].logicalOperatorDropdownSelectedIndex = queryRow.logicalOperator - 1;
          this.queryRows[queryRowIndex].comparisonOperator = queryRow.comparisonOperator;
          this.queryRows[queryRowIndex].comparisonOperatorDropdownSelectedIndex = queryRow.comparisonOperator - 1;
        }
        this.queryRows[queryRowIndex].setQueryRow(queryRowIndex);
        break;
      }

      // Sub Query
      case QueryType.SubQuery: {
        this.queryRows[queryRowIndex] = new SubQueryRow(null, this.queryBuilder, this.queryRows);
        this.queryRows[queryRowIndex].logicalOperator = queryRow.logicalOperator;
        this.queryRows[queryRowIndex].logicalOperatorDropdownSelectedIndex = queryRow.logicalOperator - 1;

        let queryListTimer: number = window.setInterval(() => {
          if (this.queryList != null) {
            window.clearInterval(queryListTimer);
            this.queryList.load(queryRow.subQueries);
          }
        })
        break;
      }
    }

    // If a wheredropdown option has been selected
    if (queryRow == null) {
      // Get the products
      this.queryBuilder.getProducts();
    }
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