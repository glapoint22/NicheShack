import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { DataService } from 'services/data.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductInfo } from '../../interfaces/product-info';

@Component({
  selector: 'quick-look',
  templateUrl: './quick-look.component.html',
  styleUrls: ['./quick-look.component.scss']
})
export class QuickLookComponent {
  public productInfo$: Observable<ProductInfo>;
  public isVisible: boolean;

  constructor(private dataService: DataService, private router: Router) { }

  show(product: Product) {
    this.isVisible = true;

    this.productInfo$ = this.dataService.get('api/Products/QuickLookProduct', [{ key: 'id', value: product.id }])
      .pipe(tap(response => {
        product.description = response.product.description;
        product.hoplink = response.product.hoplink;
        product.shareImage = response.product.shareImage;
      }), map((response) => ({
        product: product,
        media: response.media
      })));
  }


  onViewDetailsClick(product: Product) {
    this.router.navigate([product.urlTitle, product.id]);
  }
}