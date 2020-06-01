import { Component, Input } from '@angular/core';
import { CategoriesWidgetComponent } from '../../../designer/widgets/categories-widget/categories-widget.component';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  @Input() categoriesWidget: CategoriesWidgetComponent;
  public categories: Array<string>;

  ngOnChanges() {
    if (this.categoriesWidget.categories) {
      this.categories = this.categoriesWidget.categories.map(x => x.name);
    }

  }


  // -----------------------------( ADD CATEGORY )------------------------------ \\
  addCategory() {
    console.log("Add Category");
  }


  // -----------------------------( EDIT CATEGORY )------------------------------ \\
  editCategory() {
    console.log("Edit Category");
  }
}