import { Component, Input } from '@angular/core';
import { Review } from '../../classes/review';
import { DataService } from 'services/data.service';

@Component({
  selector: 'review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  @Input() review: Review;

  constructor(private dataService: DataService) { }

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

  onReportReviewClick() {
  }

}