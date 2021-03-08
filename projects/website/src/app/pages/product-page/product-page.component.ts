import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DataService } from 'services/data.service';
import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { SharePageComponent } from '../share-page/share-page.component';
import { PageContentComponent } from '../../shared-components/page-content/page-content.component';

@Component({
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent extends SharePageComponent implements OnInit {
  public productData$: Observable<any>;
  @ViewChild('pageContent', { static: false }) pageContent: PageContentComponent;

  public productData;

  constructor(
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document: Document,
    private dataService: DataService,
    private route: ActivatedRoute
  ) { super(titleService, metaService, document) }






  ngAfterViewInit() {
    this.route.paramMap
      .subscribe(() => {
        this.dataService.loading = true;

        // Get the product
        this.dataService.get('api/Products/ProductDetail', [{ key: 'id', value: this.route.snapshot.params.id }])
          .subscribe((productData) => {
            if (productData && productData.productInfo && productData.productInfo.product) {
              this.title = productData.productInfo.product.name ? productData.productInfo.product.name : '';
              this.description = productData.productInfo.product.description ? productData.productInfo.product.description.replace(/<[^>]*>/g, "") : '';
              this.productData = productData;
              this.pageContent.page.setData(productData.pageContent);
            }


            this.dataService.loading = false;
            if (window) window.scrollTo(0, 0);
            super.ngOnInit();
          });
      });
  }



  hasIndex(priceIndices, index) {
    return priceIndices.some(x => x == index);
  }
}