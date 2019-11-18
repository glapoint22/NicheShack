import { Component, OnInit } from '@angular/core';
import { DataService } from 'services/data.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Review } from '../../classes/review';
import { concatMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  public product$: Observable<any>;
  public reviews$: Observable<Array<Review>>;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.product$ = this.dataService
      .get('api/Products/ProductDetail', [{ key: 'id', value: this.route.snapshot.params.id }])
      .pipe(
        concatMap(product => {
          // If product exists
          if (product) {
            return this.dataService
              .get('api/ProductReviews/ReviewOptions')
              .pipe(map(reviewOptions => ({
                content: product.content,
                pricePoints: product.pricePoints,
                productInfo: product.productInfo,
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