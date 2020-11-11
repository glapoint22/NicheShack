import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QueryFilterOption } from '../../../classes/query-filter-option';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.scss']
})
export class PriceFilterComponent extends FilterComponent {
  @Input() options: Array<QueryFilterOption>;
  public min: string;
  public max: string;
  public currentMin: string;
  public currentMax: string;
  public showClearPrice: boolean;

  constructor(private route: ActivatedRoute) {
    super();
  }


  onSubmit(priceForm: NgForm) {
    if (priceForm.valid) {
      let filter = encodeURIComponent('Price Range|' + this.min + '-' + this.max + '|');
      let filterString: string = this.route.snapshot.queryParams['filters'];


      if (!filterString || !filterString.includes(filter)) {
        this.onChange.emit({
          key: 'Price Range',
          value: this.min + '-' + this.max
        });

        this.currentMin = this.min;
        this.currentMax = this.max;

      }
      this.showClearPrice = true;
    }
  }



  clearPrice(priceForm: NgForm) {
    this.onChange.emit({
      key: 'Price Range',
      value: this.currentMin + '-' + this.currentMax
    });
    this.min = undefined;
    this.max = undefined;
    this.showClearPrice = false;
    priceForm.resetForm();
  }
}