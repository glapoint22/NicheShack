import { Component, Input } from '@angular/core';
import { DataService } from 'services/data.service';

@Component({
  selector: 'report-review',
  templateUrl: './report-review.component.html'
})
export class ReportReviewComponent {
  @Input() productId: number;
  public show: boolean;
  public isSubmitted: boolean;

  constructor(private dataService: DataService) { }

  onSubmit() {
    this.dataService.post('api/Notifications', {
      productId: this.productId,
      type: 1,
      comments: ''
    }).subscribe(() => this.isSubmitted = true);
  }

}
