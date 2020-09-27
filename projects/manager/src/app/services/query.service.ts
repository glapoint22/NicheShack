import { Injectable } from '@angular/core';
import { Category } from '../classes/category';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  public categoryList: Array<Category> = [];
}