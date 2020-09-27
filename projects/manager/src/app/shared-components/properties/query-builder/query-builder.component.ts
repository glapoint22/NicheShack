import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { Query, QueryCategory, QueryDate, QueryFeatured, QueryKeywords, QueryNiche, QueryNone, QueryPrice, QueryRating, QueryRelated, QuerySubgroup, ValueType } from '../../../classes/query';
import { QueryService } from '../../../services/query.service';

@Component({
  selector: 'query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.scss']
})
export class QueryBuilderComponent {
  constructor(private queryService: QueryService) { }
  public queries: Array<Query> = [];
  public valueType = ValueType;

  public whereList: Array<KeyValue<any, Query>> = [
    { key: "None", value: new QueryNone() },
    { key: "Category", value: new QueryCategory(this.queryService.categoryList) },
    { key: "Niche", value: new QueryNiche() },
    { key: "Subgroup", value: new QuerySubgroup() },
    { key: "Rating", value: new QueryRating() },
    { key: "Price", value: new QueryPrice() },
    { key: "Keywords", value: new QueryKeywords() },
    { key: "Related", value: new QueryRelated() },
    { key: "Featured", value: new QueryFeatured() },
    { key: "Created", value: new QueryDate() }
  ];


  public operatorList: Array<KeyValue<any, any>> = [
    { key: "=", value: "=" },
    { key: ">", value: ">" },
    { key: ">=", value: ">=" },
    { key: "<", value: "<" },
    { key: "<=", value: "<=" },
    { key: "Is Between", value: "Is Between" }
  ];


  onQueryAdd() {
    this.queries.push(new QueryNone());
  }


  onWhereDropdownChange(query: Query, index: number) {








    // console.log(query)



    // Get the category icon based on the category Id



    // Image
    // Name
    // Rating
    // Total Reviews
    // Min Price
    // Max Price


    // select 

    // Image Name
    // (select name from Media where Id = ImageId) as [Image Name], 

    // Image URL
    // (select url from Media where Id = ImageId) as [Image URL], 

    // Product Name:
    // Name, 

    // Rating:
    // Rating, 

    // Total Reviews:
    // TotalReviews, 

    // Min Price:
    // MinPrice,

    // Max Price:
    // MaxPrice from Products 


    // where NicheId in (select id from Niches where CategoryId = (select [Id] from Categories where Name = 'Health & Fitness'))


  }
}
