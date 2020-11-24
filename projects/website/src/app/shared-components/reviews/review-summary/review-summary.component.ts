import { Component, Input } from '@angular/core';

import { Router } from '@angular/router';
import { Product } from 'classes/product';

@Component({
  selector: 'review-summary',
  templateUrl: './review-summary.component.html',
  styleUrls: ['./review-summary.component.scss']
})
export class ReviewSummaryComponent {
  @Input() product: Product;
  public reviewStats: Array<any> = [];
  private percentageTotal: number = 0;

  constructor(private router: Router) { }

  ngOnChanges(): void {
    if (this.product.id) {
      // 5 Stars
      this.reviewStats.push({
        name: '5 Stars',
        percentage: this.getStatPercentage(this.product.fiveStars)
      });

      // 4 Stars
      this.reviewStats.push({
        name: '4 Stars',
        percentage: this.getStatPercentage(this.product.fourStars)
      });

      // 3 Stars
      this.reviewStats.push({
        name: '3 Stars',
        percentage: this.getStatPercentage(this.product.threeStars)
      });

      // 2 Stars
      this.reviewStats.push({
        name: '2 Stars',
        percentage: this.getStatPercentage(this.product.twoStars)
      });

      // 1 Star
      this.reviewStats.push({
        name: '1 Star',
        percentage: this.getStatPercentage(this.product.oneStar)
      });

      // This will make sure that the sum of all percentages is 100
      if(this.percentageTotal != 100){
        let diff = 100 - this.percentageTotal;
        for(let i = 4; i > -1; i--){
          if(this.reviewStats[i].percentage != 0){
            this.reviewStats[i].percentage += diff;
            break;
          }
        }
      }
    }
  }

  getStatPercentage(count: number): number{
    let percentage = Math.round((count / this.product.totalReviews) * 100) / 100;

    percentage = Math.round(percentage * 100);
    this.percentageTotal += percentage;
    return percentage;
  }

  onWriteReviewClick(productId: string) {
    this.router.navigate(['write-review', productId]);
  }
}