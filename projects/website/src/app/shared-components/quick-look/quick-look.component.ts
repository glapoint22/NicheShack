import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { DataService } from 'services/data.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Media } from '../../interfaces/media';

@Component({
  selector: 'quick-look',
  templateUrl: './quick-look.component.html',
  styleUrls: ['./quick-look.component.scss']
})
export class QuickLookComponent {
  public product: Product;
  public media: Array<Media>;
  public quickLook$: Observable<any>;
  public isVisible: boolean;

  constructor(private dataService: DataService) { }

  show(product: Product) {
    this.isVisible = true;
    this.product = product;


    this.quickLook$ = this.dataService.get('api/Products/QuickLookProduct', [{ key: 'id', value: this.product.id }])
      .pipe(tap((response) => {
        this.media = response.media;
        this.product.description = response.description;
      }));

  }

  onMediaClick(media: Media) {

  }

  onViewDetailsClick() {

  }

}
