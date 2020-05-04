import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../../classes/category';
import { delay } from 'rxjs/operators';
import { HierarchyItem } from '../../../classes/hierarchy-item';

@Component({
  selector: 'category-editor',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.scss']
})
export class CategoryEditorComponent implements OnChanges {
  @Input() hierarchyItem: HierarchyItem;
  public category: Category = new Category();

  // ---------------------Temp-----------------------------
  public getTempCategoryIcon(): Observable<string> {
    return new Observable<string>(subscriber => {
      subscriber.next('44d71fbf43904ffdbdece40a45bdf9db.png');
    }).pipe(delay(1000));
  }


  ngOnChanges() {
    this.category.id = this.hierarchyItem.id;

    // Get the category icon based on the category Id
    this.getTempCategoryIcon().subscribe((icon: string) => {
      this.category.icon = icon;
    });
  }
}