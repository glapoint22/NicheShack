import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from 'services/data.service';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  constructor(private dataService: DataService) { }
  public onDropdownListsLoaded = new Subject<void>();
  public subgroups: Array<QueryDropdownList> = [];
  public categories: Array<QueryDropdownList> = [];
  public customerRelatedProducts: Array<QueryDropdownList> = [
    { id: 1, name: "Browsed Products" },
    { id: 2, name: "Related Products" }
  ];

  public productRating: Array<QueryDropdownList> = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
    { id: 5, name: "5" }];



  getDropdownLists() {
    this.dataService.get('api/Categories')
      .subscribe((categories) => {
        this.categories = categories;
        this.categories.forEach((x, index) => {

          this.dataService.get('api/Niches', [{ key: 'categoryId', value: x.id }])
            .subscribe((niches) => {
              x.children = niches;

              if (index == this.categories.length - 1) {
                this.dataService.get('api/Subgroups')
                  .subscribe((subgroups) => {
                    this.subgroups = subgroups;
                    this.onDropdownListsLoaded.next();
                  });
              }
            });
        })
      });
  }



}


export interface QueryDropdownList {
  id: number;
  name: string;
  children?: Array<QueryDropdownList>;
}