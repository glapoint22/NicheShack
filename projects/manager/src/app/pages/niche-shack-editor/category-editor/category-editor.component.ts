import { Component, OnInit } from '@angular/core';
import { Category } from '../../../classes/category';

@Component({
  selector: 'category-editor',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.scss']
})
export class CategoryEditorComponent implements OnInit {
  public category: Category = new Category();

  constructor() { }

  ngOnInit() {
    this.category.icon = '0aada12f8b21471ea96aebe9a503977b.png';
    this.category.name = 'Health & Fitness';
  }

  
}
