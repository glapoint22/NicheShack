import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Review } from '../../../classes/review';
import { DataService } from 'services/data.service';
import { Subscription } from 'rxjs';
import { AccountService } from 'services/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RedirectService } from '../../../services/redirect.service';

@Component({
  selector: 'review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  @Input() review: Review;
  @Input() showReviewHelpful: boolean;
  @Output() onReportReviewClick: EventEmitter<Review> = new EventEmitter();
  private subscription: Subscription;
  private isSignedIn: boolean;

  constructor(
    private dataService: DataService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private redirectService: RedirectService
  ) { }



  ngAfterViewInit() {
    // Find out if the customer is signed in
    this.subscription = this.accountService.isSignedIn
      .subscribe((value: boolean) => {
        this.isSignedIn = value;

        // If this is a redirect and we have a callback
        if (this.redirectService.callback == 'reportReviewClick') {
          window.setTimeout(() => {
            this.redirectService.callback = null;
            window.scrollTo(0, this.redirectService.scrollPosition);
            this.reportReviewClick();
          });
        }
      });
  }



  onRateReviewClick(likes: number, dislikes: number) {
    this.dataService
      .put('api/ProductReviews', {
        reviewId: this.review.id,
        likes: likes,
        dislikes: dislikes
      })
      .subscribe(() => {
        this.review.hasBeenRated = true;
      });
  }

  reportReviewClick() {
    if (this.isSignedIn) {
      this.onReportReviewClick.emit(this.review);
    } else {
      this.redirectService.redirect = { path: location.pathname, queryParams: this.route.snapshot.queryParams };
      this.redirectService.callback = 'reportReviewClick';
      this.redirectService.scrollPosition = window.scrollY;
      this.router.navigate(['/sign-in']);
    }
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}