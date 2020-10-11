import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from 'services/data.service';
import { OperatorType, Query, QueryRow, CategoryQueryRow, ProductCreationDateQueryRow, FeaturedProductsQueryRow, ProductKeywordsQueryRow, NicheQueryRow, QueryRowNone, ProductPriceQueryRow, ProductRatingQueryRow, CustomerRelatedProductsQueryRow, ProductSubgroupQueryRow, ValueType } from '../../../classes/query';
import { QueryService } from '../../../services/query.service';

@Component({
  selector: 'query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.scss']
})
export class QueryBuilderComponent {
  constructor(private queryService: QueryService, private dataService: DataService) { }
  public queryRows: Array<QueryRow> = [];
  public operatorType = OperatorType;
  public valueType = ValueType;
  public queries: Array<Query> = [];

  public whereList: Array<KeyValue<any, QueryRow>> = [
    { key: "None", value: new QueryRowNone(this.queryRows, this.queries) },
    { key: "Category", value: new CategoryQueryRow(this.queryRows, this.queries, this.queryService) },
    { key: "Niche", value: new NicheQueryRow(this.queryRows, this.queries, this.queryService) },
    { key: "Product Subgroup", value: new ProductSubgroupQueryRow(this.queryRows, this.queries, this.dataService) },
    { key: "Featured Products", value: new FeaturedProductsQueryRow(this.queryRows, this.queries) },
    { key: "Customer Related Products", value: new CustomerRelatedProductsQueryRow(this.queryRows, this.queries) },
    { key: "Product Price", value: new ProductPriceQueryRow(this.queryRows, this.queries) },
    { key: "Product Rating", value: new ProductRatingQueryRow(this.queryRows, this.queries) },
    { key: "Product Keywords", value: new ProductKeywordsQueryRow(this.queryRows, this.queries) },
    { key: "Product Creation Date", value: new ProductCreationDateQueryRow(this.queryRows, this.queries) }
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
    this.queryRows.push(new QueryRowNone(this.queryRows, this.queries));
  }











  getProducts() {

    console.log(this.queries)

    // this.dataService.post('api/Products/Alita', this.queries )
    //   .subscribe((products) => {
    //     console.log(products)
    //   });
  }
}
