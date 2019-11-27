import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'services/data.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { SharePageComponent } from '../share-page/share-page.component';

@Component({
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent extends SharePageComponent implements OnInit {
  public productData$: Observable<any>;

  constructor(
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document: Document,
    private dataService: DataService,
    private route: ActivatedRoute,
  ) { super(titleService, metaService, document) }

  ngOnInit() {
    this.productData$ = this.dataService
      .get('api/Products/ProductDetail', [{ key: 'id', value: this.route.snapshot.params.id }])
      .pipe(tap((productData) => {
        if (!productData) {
          this.dataService.pageNotFound = true;
        } else {
          this.title = productData.productInfo.product.title;
          this.description = productData.productInfo.product.description;
          super.ngOnInit();
        }
      }));
  }

  hasIndex(priceIndices, index) {
    return priceIndices.some(x => x == index);
  }


}