import { Component, Input, OnChanges } from '@angular/core';
import { Category } from '../../../classes/category';
import { HierarchyItem } from '../../../classes/hierarchy-item';
import { LoadingService } from '../../../services/loading.service';
import { MediaType } from '../../../classes/media';
import { TempDataService } from '../../../services/temp-data.service';

@Component({
  selector: 'category-editor',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.scss']
})
export class CategoryEditorComponent implements OnChanges {
  @Input() hierarchyItem: HierarchyItem;
  public category: Category;
  public mediaType = MediaType;

  constructor(public loadingService: LoadingService, private dataService: TempDataService) { }


  ngOnChanges() {
    this.loadingService.loading = true;

    // Get the category icon based on the category Id
    this.dataService.get('api/Categories/Category', [{ key: 'id', value: this.hierarchyItem.id }])
      .subscribe((icon: string) => {
        this.category = new Category();
        this.category.id = this.hierarchyItem.id;
        this.category.icon.url = icon;
        this.loadingService.loading = false;
      });
  }


  onSaveClick() {
    this.loadingService.loading = true;

    this.dataService.put('api/Categories/Category', this.category)
      .subscribe(() => {
        this.loadingService.loading = false;
      });
  }
}