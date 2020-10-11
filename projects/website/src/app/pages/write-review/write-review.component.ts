import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ValidationPageComponent } from '../validation-page/validation-page.component';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { DataService } from 'services/data.service';
import { Product } from '../../interfaces/product';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Review } from '../../classes/review';
import { tap } from 'rxjs/operators';

@Component({
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.scss']
})
export class WriteReviewComponent extends ValidationPageComponent implements OnInit {
  public review: Review = new Review();
  public product$: Observable<Product>;
  public submitted: boolean;

  constructor(
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document: Document,
    @Inject(PLATFORM_ID) platformId: Object,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) {
    super(titleService, metaService, document, platformId);
  }

  ngOnInit() {
    this.title = 'Write a Review';
    this.product$ = this.dataService
      .get('api/ProductReviews/WriteReview', [{ key: 'productId', value: this.route.snapshot.params['id'] }])
      .pipe(tap((product) => {
        this.review.productId = product.id;
      }));

    super.ngOnInit();
  }

  submitData() {
    this.dataService.post('api/ProductReviews', this.review).subscribe(() => {
      this.submitted = true;
    });
  }

  getStar(i: number) {
    if (i <= Math.floor(this.review.rating)) {
      return 'fas fa-star';
    } else {
      return 'far fa-star';
    }
  }

  goHome() {
    this.router.navigate(['']);
  }

}