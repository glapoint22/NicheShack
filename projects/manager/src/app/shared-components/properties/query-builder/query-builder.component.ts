import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from 'services/data.service';
import { OperatorType, Query, IQueryRow, CategoryQueryRow, ProductCreationDateQueryRow, FeaturedProductsQueryRow, ProductKeywordsQueryRow, NicheQueryRow, QueryRowNone, ProductPriceQueryRow, ProductRatingQueryRow, CustomerRelatedProductsQueryRow, ProductSubgroupQueryRow, ValueType } from '../../../classes/query';
import { QueryService } from '../../../services/query.service';

@Component({
  selector: 'query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.scss']
})
export class QueryBuilderComponent {
  constructor(private queryService: QueryService, private dataService: DataService) {
    if (this.queryService.categories.length == 0) this.queryService.getCategories();
    if (this.queryService.subgroups.length == 0) this.queryService.getSubgroups();
  }

  // Public
  public queryRows: Array<IQueryRow> = [];
  public operatorType = OperatorType;
  public valueType = ValueType;
  public queries: Array<Query> = [];

  public whereList: Array<KeyValue<any, IQueryRow>> = [
    { key: "None", value: new QueryRowNone(0, this.queryRows, this.queries, this.dataService) },
    { key: "Category", value: new CategoryQueryRow(1, this.queryRows, this.queries, this.dataService, this.queryService) },
    { key: "Niche", value: new NicheQueryRow(2, this.queryRows, this.queries, this.dataService, this.queryService) },
    { key: "Product Subgroup", value: new ProductSubgroupQueryRow(3, this.queryRows, this.queries, this.dataService, this.queryService) },
    { key: "Featured Products", value: new FeaturedProductsQueryRow(4, this.queryRows, this.queries, this.dataService) },
    { key: "Customer Related Products", value: new CustomerRelatedProductsQueryRow(5, this.queryRows, this.queries, this.dataService, this.queryService) },
    { key: "Product Price", value: new ProductPriceQueryRow(6, this.queryRows, this.queries, this.dataService) },
    { key: "Product Rating", value: new ProductRatingQueryRow(7, this.queryRows, this.queries, this.dataService, this.queryService) },
    { key: "Product Keywords", value: new ProductKeywordsQueryRow(8, this.queryRows, this.queries, this.dataService) },
    { key: "Product Creation Date", value: new ProductCreationDateQueryRow(9, this.queryRows, this.queries, this.dataService) }
  ];


  public operatorList: Array<KeyValue<any, any>> = [
    { key: "=", value: OperatorType.Equals },
    { key: ">", value: OperatorType.GreaterThan },
    { key: ">=", value: OperatorType.GreaterThanOrEqualTo },
    { key: "<", value: OperatorType.LessThan },
    { key: "<=", value: OperatorType.LessThanOrEqualTo },
    // { key: "Is Between", value: OperatorType.IsBetween }
  ];



  onQueryAdd() {
    this.queryRows.push(new QueryRowNone(0, this.queryRows, this.queries, this.dataService));
  }











  getProducts() {

    console.log(this.queries)



    // this.dataService.post('api/Products/Alita', this.queries)
    //   .subscribe((products) => {
    //     console.log(products)
    //   });


  }
}
