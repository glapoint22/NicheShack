import { Component, Input, OnChanges } from '@angular/core';
import { LoadingService } from 'projects/manager/src/app/services/loading.service';
import { ProductService } from 'projects/manager/src/app/services/product.service';
import { Product } from 'projects/manager/src/app/classes/product';
import { TempDataService } from 'projects/manager/src/app/services/temp-data.service';

@Component({
  selector: 'product-properties',
  templateUrl: './product-properties.component.html',
  styleUrls: ['./product-properties.component.scss']
})
export class ProductPropertiesComponent implements OnChanges {
  @Input() productId: string;
  public product: Product;

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
        });
    }
  }
}