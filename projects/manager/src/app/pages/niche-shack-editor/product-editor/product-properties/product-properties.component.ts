import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { LoadingService } from 'projects/manager/src/app/services/loading.service';
import { ProductService } from 'projects/manager/src/app/services/product.service';
import { Product } from 'projects/manager/src/app/classes/product';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { DataService } from 'services/data.service';

@Component({
  selector: 'product-properties',
  templateUrl: './product-properties.component.html',
  styleUrls: ['./product-properties.component.scss']
})
export class ProductPropertiesComponent implements OnChanges {
  @Input() productId: string;
  @ViewChild('productDescription', { static: false }) productDescription: ProductDescriptionComponent;
  public product: Product;

  constructor(
    public loadingService: LoadingService,
    public productService: ProductService,
    private dataService: DataService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnChanges() {
    if (this.productId) {
      // Display the loading screen
      this.loadingService.loading = true;

      this.dataService.get('api/Products/Product', [{ key: 'productId', value: this.productId }])
        .subscribe((product: Product) => {
          // Set the current media as the first media
          if (product.media.length > 0) {
            this.productService.setCurrentSelectedMedia(product.media[0]);
          }

          // Assign the product
          this.productService.product = this.product = product;


          // This will display the description in the product info window
          this.productService.product.safeDescription = this.sanitizer.bypassSecurityTrustHtml(this.product.description);

          // Assign the product description
          if(this.productDescription) {
            this.productDescription.description.content.innerHTML = product.description;
          }

          this.loadingService.loading = false;
        });
    }
  }
}