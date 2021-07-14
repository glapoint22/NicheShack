import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { ShippingType } from 'classes/shipping-type';
import { Product } from 'projects/manager/src/app/classes/product';

@Component({
  selector: 'price-points',
  templateUrl: './price-points.component.html',
  styleUrls: ['./price-points.component.scss']
})
export class PricePointsComponent implements AfterViewInit {
  constructor() { }
  
  public shippingType = ShippingType;
  public pricePointWidth: number;
  public headerFontSize: number;
  public quantityFontSize: number;
  public unitPriceFontSize: number;
  public unitFontSize: number;
  public totalFontSize: number;
  public buttonFontSize: number;
  public shippingFontSize: number;
  @Input() product: Product;
  @ViewChildren('pricePoints') pricePoints: QueryList<ElementRef>;
  @Output() onBuyClick: EventEmitter<string> = new EventEmitter();
  


  



  ngAfterViewInit() {
    switch (this.product.price.length) {
      case 1: {
        this.pricePoints.find((item, index) => index == 0).nativeElement.className = "c1-p0";
        break;
      }
      case 2: {
        this.pricePoints.find((item, index) => index == 0).nativeElement.className = "c2-p0";
        this.pricePoints.find((item, index) => index == 1).nativeElement.className = "c2-p1";
        break;
      }
      case 3: {
        this.pricePoints.find((item, index) => index == 0).nativeElement.className = "c3-p0";
        this.pricePoints.find((item, index) => index == 1).nativeElement.className = "c3-p1";
        this.pricePoints.find((item, index) => index == 2).nativeElement.className = "c3-p2";
        break;
      }
      case 4: {
        this.pricePoints.find((item, index) => index == 0).nativeElement.className = "c4-p0";
        this.pricePoints.find((item, index) => index == 1).nativeElement.className = "c4-p1";
        this.pricePoints.find((item, index) => index == 2).nativeElement.className = "c4-p2";
        this.pricePoints.find((item, index) => index == 3).nativeElement.className = "c4-p3";
        break;
      }
      case 5: {
        this.pricePoints.find((item, index) => index == 0).nativeElement.className = "c5-p0";
        this.pricePoints.find((item, index) => index == 1).nativeElement.className = "c5-p1";
        this.pricePoints.find((item, index) => index == 2).nativeElement.className = "c5-p2";
        this.pricePoints.find((item, index) => index == 3).nativeElement.className = "c5-p3";
        this.pricePoints.find((item, index) => index == 4).nativeElement.className = "c5-p4";
        break;
      }
      case 6: {
        this.pricePoints.find((item, index) => index == 0).nativeElement.className = "c6-p0";
        this.pricePoints.find((item, index) => index == 1).nativeElement.className = "c6-p1";
        this.pricePoints.find((item, index) => index == 2).nativeElement.className = "c6-p2";
        this.pricePoints.find((item, index) => index == 3).nativeElement.className = "c6-p3";
        this.pricePoints.find((item, index) => index == 4).nativeElement.className = "c6-p4";
        this.pricePoints.find((item, index) => index == 5).nativeElement.className = "c6-p5";
        break;
      }
      case 7: {
        this.pricePoints.find((item, index) => index == 0).nativeElement.className = "c7-p0";
        this.pricePoints.find((item, index) => index == 1).nativeElement.className = "c7-p1";
        this.pricePoints.find((item, index) => index == 2).nativeElement.className = "c7-p2";
        this.pricePoints.find((item, index) => index == 3).nativeElement.className = "c7-p3";
        this.pricePoints.find((item, index) => index == 4).nativeElement.className = "c7-p4";
        this.pricePoints.find((item, index) => index == 5).nativeElement.className = "c7-p5";
        this.pricePoints.find((item, index) => index == 6).nativeElement.className = "c7-p6";
        break;
      }
      case 8: {
        this.pricePoints.find((item, index) => index == 0).nativeElement.className = "c8-p0";
        this.pricePoints.find((item, index) => index == 1).nativeElement.className = "c8-p1";
        this.pricePoints.find((item, index) => index == 2).nativeElement.className = "c8-p2";
        this.pricePoints.find((item, index) => index == 3).nativeElement.className = "c8-p3";
        this.pricePoints.find((item, index) => index == 4).nativeElement.className = "c8-p4";
        this.pricePoints.find((item, index) => index == 5).nativeElement.className = "c8-p5";
        this.pricePoints.find((item, index) => index == 6).nativeElement.className = "c8-p6";
        this.pricePoints.find((item, index) => index == 7).nativeElement.className = "c8-p7";
        break;
      }
      case 9: {
        this.pricePoints.find((item, index) => index == 0).nativeElement.className = "c9-p0";
        this.pricePoints.find((item, index) => index == 1).nativeElement.className = "c9-p1";
        this.pricePoints.find((item, index) => index == 2).nativeElement.className = "c9-p2";
        this.pricePoints.find((item, index) => index == 3).nativeElement.className = "c9-p3";
        this.pricePoints.find((item, index) => index == 4).nativeElement.className = "c9-p4";
        this.pricePoints.find((item, index) => index == 5).nativeElement.className = "c9-p5";
        this.pricePoints.find((item, index) => index == 6).nativeElement.className = "c9-p6";
        this.pricePoints.find((item, index) => index == 7).nativeElement.className = "c9-p7";
        this.pricePoints.find((item, index) => index == 8).nativeElement.className = "c9-p8";
        break;
      }
      case 10: {
        this.pricePoints.find((item, index) => index == 0).nativeElement.className = "c10-p0";
        this.pricePoints.find((item, index) => index == 1).nativeElement.className = "c10-p1";
        this.pricePoints.find((item, index) => index == 2).nativeElement.className = "c10-p2";
        this.pricePoints.find((item, index) => index == 3).nativeElement.className = "c10-p3";
        this.pricePoints.find((item, index) => index == 4).nativeElement.className = "c10-p4";
        this.pricePoints.find((item, index) => index == 5).nativeElement.className = "c10-p5";
        this.pricePoints.find((item, index) => index == 6).nativeElement.className = "c10-p6";
        this.pricePoints.find((item, index) => index == 7).nativeElement.className = "c10-p7";
        this.pricePoints.find((item, index) => index == 8).nativeElement.className = "c10-p8";
        this.pricePoints.find((item, index) => index == 9).nativeElement.className = "c10-p9";
        break;
      }
    }
  }
}