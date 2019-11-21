import { Component } from '@angular/core';

@Component({
  selector: 'report-review',
  templateUrl: './report-review.component.html'
})
export class ReportReviewComponent {
  public show: boolean;
  public isSubmitted: boolean;

  constructor() { }

  onSubmit() {
    this.isSubmitted = true;
  }

}
