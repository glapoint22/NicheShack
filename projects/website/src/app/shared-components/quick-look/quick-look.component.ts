import { Component, OnInit } from '@angular/core';
import { ShowHideComponent } from '../show-hide/show-hide.component';
import { Product } from '../../interfaces/product';
import { DataService } from 'services/data.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'quick-look',
  templateUrl: './quick-look.component.html',
  styleUrls: ['./quick-look.component.scss']
})
export class QuickLookComponent extends ShowHideComponent implements OnInit {
  public product: Product;
  public media: any;

  public quickLook$: Observable<any>;




  constructor(private dataService: DataService) { super(); }

  ngOnInit() {
  }

  onClick(product: Product) {
    this.product = product;
    super.onClick();

    this.quickLook$ = this.dataService.get('api/Products/QuickLookProduct', [{ key: 'id', value: this.product.id }])
      .pipe(tap((results) => {
        this.media = results.media;
        this.product.description = results.description;
      }))

  }

  onMediaClick(media: any) {
    this.show = false;
  }

  onViewDetailsClick() {
    console.log('hello');
  }

}
