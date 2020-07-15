import { Component, Input, OnChanges } from '@angular/core';
import { Category } from '../../../classes/category';
import { HierarchyItem } from '../../../classes/hierarchy-item';
import { LoadingService } from '../../../services/loading.service';
import { MediaType } from '../../../classes/media';
import { TempDataService } from '../../../services/temp-data.service';
import { ImageData } from '../../../classes/image-data';

@Component({
  selector: 'category-editor',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.scss']
})
export class CategoryEditorComponent implements OnChanges {
  @Input() hierarchyItem: HierarchyItem;
  public category: Category;
  public mediaType = MediaType;

  constructor(
    public loadingService: LoadingService,
    private dataService: TempDataService
  ) { }



  onChange() {
    // Update the icon
    this.dataService.put('api/Categories/Icon', this.category).subscribe();
  }



  ngOnChanges() {
    this.loadingService.loading = true;

    // Get the category icon based on the category Id
    this.dataService.get('api/Categories', [{ key: 'id', value: this.hierarchyItem.id }])
      .subscribe((icon: ImageData) => {

        // Set the category
        this.category = {
          id: this.hierarchyItem.id,
          name: this.hierarchyItem.name,
          icon: icon
        }

        // Hide loading
        this.loadingService.loading = false;
      });
  }
}