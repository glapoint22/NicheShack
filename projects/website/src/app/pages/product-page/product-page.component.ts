import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'services/data.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Review } from '../../classes/review';
import { concatMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { SharePageComponent } from '../share-page/share-page.component';

@Component({
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent extends SharePageComponent implements OnInit {
  public productData$: Observable<any>;
  public reviews$: Observable<Array<Review>>;

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
      .pipe(
        concatMap(productData => {
          // If product exists
          if (productData) {
            // Set the page properties
            this.title = productData.productInfo.product.title;
            this.description = productData.productInfo.product.description;
            this.image = '/images/' + productData.productInfo.product.shareImage;
            super.ngOnInit();

            // Get the review options
            return this.dataService
              .get('api/ProductReviews/ReviewOptions')
              .pipe(map(reviewOptions => ({
                content: productData.content,
                pricePoints: productData.pricePoints,
                productInfo: productData.productInfo,
                reviewsPerPage: reviewOptions.reviewsPerPage,
                sortOptions: reviewOptions.sortOptions
              })))
          }

          // Product does not exist
          this.dataService.pageNotFound = true;
          return of();
        }));


    this.route.queryParamMap.subscribe((queryParams: ParamMap) => {

      // Get the customer reviews
      this.reviews$ = this.dataService
        .get('api/ProductReviews', [
          {
            key: 'productId',
            value: this.route.snapshot.params.id
          },
          {
            key: 'sortBy',
            value: queryParams.get('sort')
          }
        ])
    });
  }
}