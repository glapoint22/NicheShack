import { Component, Input, OnChanges } from '@angular/core';
import { HierarchyItem } from '../../../classes/hierarchy-item';
import { LoadingService } from '../../../services/loading.service';
import { DataService } from 'services/data.service';
import { Image } from '../../../classes/image';
import { ImageData } from 'classes/image-data';
import { DetailedItem } from '../../../classes/detailed-item';
import { MediaType } from '../../../classes/media';
import { SaveService } from '../../../services/save.service';

@Component({
  selector: 'niche-editor',
  templateUrl: './niche-editor.component.html',
  styleUrls: ['./niche-editor.component.scss']
})
export class NicheEditorComponent implements OnChanges {
  @Input() hierarchyItem: HierarchyItem;
  public niche: DetailedItem;
  public mediaType = MediaType;

  constructor(private loadingService: LoadingService, private dataService: DataService, private saveService: SaveService){}


  onChange() {
    // Update the icon
    this.saveService.save({
      url: 'api/Niches/Image',
      data: {
        itemId: this.niche.id,
        propertyId: this.niche.icon.id
      }
      
    });
  }



  ngOnChanges() {
    this.loadingService.loading = true;

    // Get the category icon based on the category Id
    this.dataService.get('api/Niches/Image', [{ key: 'nicheId', value: this.hierarchyItem.id }])
      .subscribe((icon: ImageData) => {

        // Set the category
        this.niche = {
          id: this.hierarchyItem.id,
          name: this.hierarchyItem.name,
          icon: icon ? icon : new Image()
        }

        // Hide loading
        this.loadingService.loading = false;
      });
  }
}