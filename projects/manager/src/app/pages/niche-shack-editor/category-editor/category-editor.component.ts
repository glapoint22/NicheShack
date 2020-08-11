import { Component, Input, OnChanges } from '@angular/core';
import { Category } from '../../../classes/category';
import { HierarchyItem } from '../../../classes/hierarchy-item';
import { LoadingService } from '../../../services/loading.service';
import { MediaType } from '../../../classes/media';
import { ImageData } from '../../../classes/image-data';
import { SaveService } from '../../../services/save.service';
import { DataService } from 'services/data.service';

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
    private dataService: DataService,
    private saveService: SaveService
  ) { }



  onChange() {
    // Update the icon
    this.saveService.save({
      url: 'api/Categories/Image',
      data: {
        itemId: this.category.id,
        propertyId: this.category.icon.id
      }
      
    });
  }



  ngOnChanges() {
    this.loadingService.loading = true;

    // Get the category icon based on the category Id
    this.dataService.get('api/Categories/Image', [{ key: 'categoryId', value: this.hierarchyItem.id }])
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