import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DataService } from 'services/data.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { SharePageComponent } from '../share-page/share-page.component';
import { PageContentComponent } from '../../shared-components/page-content/page-content.component';
import { PageData } from '../../classes/page-data';

@Component({
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent extends SharePageComponent implements OnInit {
  public productData$: Observable<any>;
  @ViewChild('pageContent', { static: false }) pageContent: PageContentComponent;

  constructor(
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document: Document,
    private dataService: DataService,
    private route: ActivatedRoute
  ) { super(titleService, metaService, document) }



  ngOnInit() {
    this.route.paramMap.subscribe(() => {

      // Get the product
      this.productData$ = this.dataService
        .get('api/Products/ProductDetail', [{ key: 'id', value: this.route.snapshot.params.id }])
        .pipe(tap((productData) => {
          this.title = productData.productInfo.product.name;
          this.description = productData.productInfo.product.description;
          super.ngOnInit();

          // Get the page content
          this.dataService.get('api/Products/PageContent', [{ key: 'urlId', value: this.route.snapshot.params.id }])
            .subscribe((pageData: PageData) => {
              if (pageData) this.pageContent.page.setData(pageData);
            });
        }));
    });
  }



  hasIndex(priceIndices, index) {
    return priceIndices.some(x => x == index);
  }
}