import { Component, Input } from '@angular/core';
import { DataService } from 'services/data.service';
import { Review } from '../../../classes/review';

@Component({
  selector: 'report-review',
  templateUrl: './report-review.component.html'
})
export class ReportReviewComponent {
  @Input() review: Review;
  public show: boolean;
  public isSubmitted: boolean;
  public comments: string;

  constructor(private dataService: DataService) { }

 

  onSubmit() {
    this.dataService.post('api/Notifications', {
      productId: this.review.productId,
      reviewId: this.review.id,
      type: 1,
      comments: this.comments
    }).subscribe(() => this.isSubmitted = true);
  }
}