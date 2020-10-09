import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { OperatorType, Query, QueryRow, CategoryQueryRow, ProductCreationDateQueryRow, FeaturedProductsQueryRow, ProductKeywordsQueryRow, NicheQueryRow, QueryRowNone, ProductPriceQueryRow, ProductRatingQueryRow, CustomerRelatedProductsQueryRow, ProductSubgroupQueryRow, ValueType } from '../../../classes/query';
import { QueryService } from '../../../services/query.service';

@Component({
  selector: 'query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.scss']
})
export class QueryBuilderComponent {
  constructor(private queryService: QueryService) { }
  public queryRows: Array<QueryRow> = [];
  public operatorType = OperatorType;
  public valueType = ValueType;
  public queries: Array<Query> = [];

  public whereList: Array<KeyValue<any, QueryRow>> = [
    { key: "None", value: new QueryRowNone(this.queryRows) },
    { key: "Category", value: new CategoryQueryRow(this.queryRows, this.queryService.categoryList) },
    { key: "Niche", value: new NicheQueryRow(this.queryRows) },
    { key: "Product Subgroup", value: new ProductSubgroupQueryRow(this.queryRows) },
    { key: "Featured Products", value: new FeaturedProductsQueryRow(this.queryRows) },
    { key: "Customer Related Products", value: new CustomerRelatedProductsQueryRow(this.queryRows) },
    { key: "Product Price", value: new ProductPriceQueryRow(this.queryRows) },
    { key: "Product Rating", value: new ProductRatingQueryRow(this.queryRows) },
    { key: "Product Keywords", value: new ProductKeywordsQueryRow(this.queryRows) },
    { key: "Product Creation Date", value: new ProductCreationDateQueryRow(this.queryRows) }
  ];


  public operatorList: Array<KeyValue<any, any>> = [
    { key: "=", value: OperatorType.Equals },
    { key: ">", value: OperatorType.GreaterThan },
    { key: ">=", value: OperatorType.GreaterThanOrEqualTo },
    { key: "<", value: OperatorType.LessThan },
    { key: "<=", value: OperatorType.LessThanOrEqualTo },
    { key: "Is Between", value: OperatorType.IsBetween }
  ];



  onQueryAdd() {
    this.queryRows.push(new QueryRowNone(this.queryRows));
    this.queries.push({ where: null, operator: null, value: null });
  }


  

}
