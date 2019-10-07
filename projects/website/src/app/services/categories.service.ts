import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { AsyncSubject } from 'rxjs';
import { DataService } from 'services/data.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  public categories = new AsyncSubject();

  constructor(dataService: DataService) {
    dataService.get('api/categories')
      .subscribe((categories: Array<Category>) => {
        this.categories.next(categories);
        this.categories.complete();
      });
   }
}