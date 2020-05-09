import { Component, Input } from '@angular/core';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  @Input() categories: Array<string>;


  // -----------------------------( ADD CATEGORY )------------------------------ \\
  addCategory() {
    console.log("Add Category");
  }


  // -----------------------------( EDIT CATEGORY )------------------------------ \\
  editCategory() {
    console.log("Edit Category");
  }
}