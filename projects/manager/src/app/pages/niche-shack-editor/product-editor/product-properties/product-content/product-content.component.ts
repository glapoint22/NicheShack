import { Component, Input, OnChanges } from '@angular/core';
import { ProductPricePoint } from 'projects/manager/src/app/classes/product-price-point';
import { ProductContent } from 'projects/manager/src/app/classes/product-content';

@Component({
  selector: 'product-content',
  templateUrl: './product-content.component.html',
  styleUrls: ['./product-content.component.scss']
})
export class ProductContentComponent implements OnChanges{
  public pricePointList: Array<string>;
  @Input() content: Array<ProductContent>;
  @Input() pricePoints: Array<ProductPricePoint>;


  // -----------------------------( NG ON CHANGES )------------------------------ \\
  ngOnChanges() {
    let formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});

    this.pricePointList = this.pricePoints.map(x => (
      // Text Before
      ((x.textBefore.length == 0 ? "" : x.textBefore) + " " +
      // Price
      (formatter.format(parseFloat(x.wholeNumber + "." + x.decimal))) +
      // Text After
      (x.textAfter.length == 0 ? '' : " " + x.textAfter)).trim()));
  }


  // -----------------------------( ADD PRICE POINT )------------------------------ \\
  addPricePoint() {
    console.log("Add Price Point");
  }


  // -----------------------------( EDIT PRICE POINT )------------------------------ \\
  editPricePoint() {
    console.log("Edit Price Point");
  }
}