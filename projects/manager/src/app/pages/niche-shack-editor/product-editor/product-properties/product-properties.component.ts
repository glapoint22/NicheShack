import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { LoadingService } from 'projects/manager/src/app/services/loading.service';
import { ProductService } from 'projects/manager/src/app/services/product.service';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { Product } from 'projects/manager/src/app/classes/product';
import { TempDataService } from 'projects/manager/src/app/services/temp-data.service';
import { MediaType } from 'projects/manager/src/app/classes/media';

@Component({
  selector: 'product-properties',
  templateUrl: './product-properties.component.html',
  styleUrls: ['./product-properties.component.scss']
})
export class ProductPropertiesComponent implements OnChanges {
  @Input() productId: string;
  @ViewChild('description', { static: false }) productDescription: ProductDescriptionComponent;
  public product: Product;
  public mediaType = MediaType;

  constructor(public loadingService: LoadingService, public productService: ProductService, private dataService: TempDataService) { }

  ngOnChanges() {
    if (this.productId) {
      // Display the loading screen
      this.loadingService.loading = true;

      this.dataService.get('api/Products/Product', [{ key: 'id', value: this.productId }])
        .subscribe((product: Product) => {
          // Set the current media as the first media
          if (product.media.length > 0) {
            this.productService.currentSelectedMedia = product.media[0];
          }

          // Assign the product
          this.productService.product = this.product = product;
          this.loadingService.loading = false;

          // Set the product description
          if (this.productDescription && this.productDescription.description) {
            this.productDescription.description.content.innerHTML = product.description;
            this.productDescription.description.onChange.next();
          }
        });
    }
  }



  onSaveClick() {
    this.loadingService.loading = true;

    this.dataService.put('api/Products/Product', this.product)
      .subscribe(() => {
        this.loadingService.loading = false;
      });
  }
}