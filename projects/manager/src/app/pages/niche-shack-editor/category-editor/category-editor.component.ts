import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../../classes/category';
import { delay } from 'rxjs/operators';
import { HierarchyItem } from '../../../classes/hierarchy-item';
import { LoadingService } from '../../../services/loading.service';
import { MediaType } from '../../../classes/media';

@Component({
  selector: 'category-editor',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.scss']
})
export class CategoryEditorComponent implements OnChanges {
  @Input() hierarchyItem: HierarchyItem;
  public category: Category;
  public mediaType = MediaType;

  constructor(public loadingService: LoadingService) { }

  // ---------------------Temp-----------------------------
  public getTempCategoryIcon(id: string): Observable<string> {
    return new Observable<string>(subscriber => {
      subscriber.next('44d71fbf43904ffdbdece40a45bdf9db.png');
    }).pipe(delay(1000));
  }


  ngOnChanges() {
    this.loadingService.loading = true;
    
    // Get the category icon based on the category Id
    this.getTempCategoryIcon(this.hierarchyItem.id).subscribe((icon: string) => {
      this.category = new Category();
      this.category.id = this.hierarchyItem.id;
      this.category.icon.url = icon;
      this.loadingService.loading = false;
    });
  }
}