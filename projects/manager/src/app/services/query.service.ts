import { Injectable } from '@angular/core';
import { DataService } from 'services/data.service';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  constructor(private dataService: DataService) { }
  public subgroups: Array<QueryList> = [];
  public categories: Array<QueryList> = [];
  public customerRelatedProducts: Array<QueryList> = [
    { id: 1, name: "List Products" },
    { id: 2, name: "Purchased Products" },
    { id: 3, name: "Browsed Products" }];


  
  getCategories() {
    this.dataService.get('api/Categories')
      .subscribe((categories) => {
        this.categories = categories;
        this.categories.forEach(x => {

          this.dataService.get('api/Niches', [{ key: 'categoryId', value: x.id }])
            .subscribe((niches) => {
              x.niches = niches;
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


export interface QueryList {
  id: number;
  name: string;
  niches?: Array<QueryList>;
}