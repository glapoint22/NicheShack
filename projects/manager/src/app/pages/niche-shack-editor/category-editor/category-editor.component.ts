import { Component, Input, OnChanges } from '@angular/core';
import { DetailedItem } from '../../../classes/detailed-item';
import { HierarchyItem } from '../../../classes/hierarchy-item';
import { LoadingService } from '../../../services/loading.service';
import { MediaType } from '../../../classes/media';
import { DataService } from 'services/data.service';
import { Image } from '../../../classes/image';

@Component({
  selector: 'category-editor',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.scss']
})
export class CategoryEditorComponent implements OnChanges {
  @Input() hierarchyItem: HierarchyItem;
  public category: DetailedItem;
  public mediaType = MediaType;

  constructor(
    private loadingService: LoadingService,
    private dataService: DataService
  ) { }



  onChange() {
    // Update the icon
    this.dataService.put('api/Categories/Image', {
      itemId: this.category.id,
      propertyId: this.category.icon.id
    }).subscribe();
  }



  ngOnChanges() {
    this.loadingService.loading = true;

    // Get the category icon based on the category Id
    this.dataService.get('api/Categories/Image', [{ key: 'categoryId', value: this.hierarchyItem.id }])
      .subscribe((icon: Image) => {

        // Set the category
        this.category = {
          id: this.hierarchyItem.id,
          name: this.hierarchyItem.name,
          icon: icon ? icon : new Image()
        }

        // Hide loading
        this.loadingService.loading = false;
      });
  }
}