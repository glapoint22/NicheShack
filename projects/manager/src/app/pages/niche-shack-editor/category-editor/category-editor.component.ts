import { Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../../classes/category';
import { HierarchyItem } from '../../../classes/hierarchy-item';
import { LoadingService } from '../../../services/loading.service';
import { MediaType } from '../../../classes/media';
import { TempDataService } from '../../../services/temp-data.service';
import { PopupService } from '../../../services/popup.service';
import { ImageData } from '../../../classes/image-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'category-editor',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.scss']
})
export class CategoryEditorComponent implements OnInit, OnChanges, OnDestroy {
  @Input() hierarchyItem: HierarchyItem;
  public category: Category;
  public mediaType = MediaType;
  private currentIcon: string;
  private subscription: Subscription;

  constructor(
    public loadingService: LoadingService,
    private dataService: TempDataService,
    private popupService: PopupService
  ) { }



  ngOnInit() {
    this.subscription = this.popupService.mediaBrowserPopup.onPopupClose
      .subscribe(() => {
        // Test to see if the icon changed
        if (this.currentIcon != this.category.icon.id) {

          // Update the icon
          this.dataService.put('api/Categories', this.category)
            .subscribe(() => {
              // Set the current icon as the new icon
              this.currentIcon = this.category.icon.id;
            });
        }
      });
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

        // Set the current icon as this icon
        if (icon) this.currentIcon = this.category.icon.id;

        // Hide loading
        this.loadingService.loading = false;
      });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}