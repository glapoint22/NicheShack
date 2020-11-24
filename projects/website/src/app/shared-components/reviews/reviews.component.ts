import { Component, OnInit, Input } from '@angular/core';
import { Review } from '../../classes/review';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DataService } from 'services/data.service';
import { KeyValue } from '@angular/common';
import { ReportReviewComponent } from './report-review/report-review.component';
import { Product } from 'classes/product';

@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  @Input() product: Product;
  @Input() paging: boolean;
  public sortOptions: Array<KeyValue<string, string>>;
  public selectedSortOption: KeyValue<string, string>;
  public reviewsPerPage: number;
  public reviews: Array<Review>;
  public positiveReview: Review;
  public negativeReview: Review;
  public reportedReview: Review;
  public currentPage: number;
  public pageCount: number;
  public reviewsStart: number;
  public reviewsEnd: number;

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    // Review Options
    this.dataService.get('api/ProductReviews/ReviewOptions')
      .subscribe((reviewOptions: any) => {
        this.sortOptions = reviewOptions.sortOptions.map(x => ({
          key: x.Key,
          value: x.Value
        }));
        this.reviewsPerPage = reviewOptions.reviewsPerPage;
        this.pageCount = Math.max(1, Math.ceil(this.product.totalReviews / this.reviewsPerPage));

        let index = Math.max(0, this.sortOptions.findIndex(x => x.value == this.route.snapshot.queryParams['sort']));
        this.selectedSortOption = this.sortOptions[index];
      });


    // Positive & Negative Reviews
    this.dataService.get('api/ProductReviews/PositiveNegativeReviews', [
      {
        key: 'productId',
        value: this.route.snapshot.params.id
      }
    ])
      .subscribe((response: any) => {
        this.positiveReview = response.positiveReview;
        this.negativeReview = response.negativeReview;
      });


    this.route.queryParamMap.subscribe((queryParams: ParamMap) => {
      let currentPage = queryParams.has('page') ? Math.max(1, Number.parseInt(queryParams.get('page'))) : 1;

      // Get the customer reviews
      this.dataService
        .get('api/ProductReviews', [
          {
            key: 'productId',
            value: this.route.snapshot.params.id
          },
          {
            key: 'page',
            value: currentPage
          },
          {
            key: 'sortBy',
            value: queryParams.get('sort')
          }
        ])
        .subscribe((reviews: Array<Review>) => {
          this.reviews = reviews;
          this.currentPage = currentPage;

          // Set the properties that display the starting and ending of reviews
          this.reviewsStart = this.reviewsPerPage * (this.currentPage - 1) + 1;
          this.reviewsEnd = this.reviewsStart + this.reviews.length - 1;

          // Scroll to top of the reviews
          let reviewsElement = document.getElementById('reviews');
          if (reviewsElement) {
            window.scrollTo({
              top: reviewsElement.offsetTop - 80,
              left: 0,
              behavior: 'smooth'
            });
          }
        });
    });
  }


  trackReview(index: number, review: Review) {
    return review.id;
  }

  setSort() {
    this.router.navigate([], {
      queryParams: { sort: this.selectedSortOption.value, page: null },
      queryParamsHandling: 'merge'
    });
  }

  

  onViewAllReviewsClick() {
    this.router.navigate(['reviews'], {
      relativeTo: this.route
    });
  }


  onReportReviewClick(reportReviewForm: ReportReviewComponent, reportedReview: Review) {
    reportReviewForm.show = true
    this.reportedReview = reportedReview;
  }
}