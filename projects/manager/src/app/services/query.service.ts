import { Injectable } from '@angular/core';
import { DataService } from 'services/data.service';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  constructor(private dataService: DataService) { }
  public results: number = 0;
  // public productResultsInProgress: boolean;
  public subgroups: Array<QueryDropdownList> = [];
  public categories: Array<QueryDropdownList> = [];
  public customerRelatedProducts: Array<QueryDropdownList> = [
    { id: 1, name: "List Products" },
    { id: 2, name: "Purchased Products" },
    { id: 3, name: "Browsed Products" }];
    
  public productRating: Array<QueryDropdownList> = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
    { id: 5, name: "5" }];



  getCategories() {
    this.dataService.get('api/Categories')
      .subscribe((categories) => {
        this.categories = categories;
        this.categories.forEach(x => {

          this.dataService.get('api/Niches', [{ key: 'categoryId', value: x.id }])
            .subscribe((niches) => {
              x.children = niches;
            });
        })
      });
  }


  getSubgroups() {
    this.dataService.get('api/Subgroups')
      .subscribe((subgroups) => {
        this.subgroups = subgroups;
      });
  }
}


export interface QueryDropdownList {
  id: number;
  name: string;
  children?: Array<QueryDropdownList>;
}