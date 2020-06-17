import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { ProductPricePoint } from 'projects/manager/src/app/classes/product-price-point';
import { ProductContent } from 'projects/manager/src/app/classes/product-content';
import { PanelComponent } from 'projects/manager/src/app/shared-components/panels/panel/panel.component';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { Item } from 'projects/manager/src/app/classes/item';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LoadingService } from 'projects/manager/src/app/services/loading.service';

@Component({
  selector: 'product-content',
  templateUrl: './product-content.component.html',
  styleUrls: ['./product-content.component.scss']
})
export class ProductContentComponent implements OnChanges {
  // public checkList = [];
  public contentIndex: number = 0;
  public pricePointList: Array<Item>;
  @Input() content: Array<ProductContent>;
  @Input() pricePoints: Array<ProductPricePoint>;
  @ViewChild('panel', { static: false }) panel: PanelComponent;


  constructor(public popupService: PopupService, private loadingService: LoadingService) { }



  //                                                                 TEMP!!!!!!
  // ******************************************************************************************************************************************
  public addTempPricePoint(): Observable<string> {
    return of('YGFDSFSDAFW').pipe(delay(1000));
  }
  // ******************************************************************************************************************************************


  // -----------------------------( NG ON CHANGES )------------------------------ \\
  ngOnChanges() {
    // let priceIndices: Array<Array<number>>;
    let formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

    // Map the content's price indices into a stand alone array
    // if (this.content) {
    //   priceIndices = this.content.map(x => (x.priceIndices));
    // }

    // Combine all the price point properties into one string
    if (this.pricePoints) {

      this.pricePointList = this.pricePoints.map(x => ({
        id: x.id,
        // Text Before
        name: ((x.textBefore.length == 0 ? "" : x.textBefore) + " " +
          // Price
          (formatter.format(parseFloat(x.wholeNumber + "." + x.decimal))) +
          // Text After
          (x.textAfter.length == 0 ? '' : " " + x.textAfter)).trim()
      }));
    }

    // Convert the price indices into boolean values
    // if (this.content && this.pricePoints) {
    //   for (let i = 0; i < priceIndices.length; i++) {
    //     this.checkList[i] = [];

    //     for (let j = 0; j < this.pricePoints.length; j++) {
    //       this.checkList[i].push(priceIndices[i].indexOf(j) != -1 ? true : false)
    //     }
    //   }
    // }
  }


  // -----------------------------( ADD PRICE POINT )------------------------------ \\
  addPricePoint(sourceElement: HTMLElement) {
    this.loadingService.loading = true;

    this.addTempPricePoint().subscribe((id: string) => {
      this.popupService.sourceElement = sourceElement;
      this.popupService.pricePointPopup.show = true;
      let pricePoint: ProductPricePoint = {
        id: id,
        textBefore: null,
        textAfter: null,
        wholeNumber: 0,
        decimal: 0
      }

      this.pricePoints.push(pricePoint);
      this.pricePointList.push({
        id: pricePoint.id,
        name: ''
      });
      

      this.popupService.pricePointPopup.pricePoint = pricePoint;
      

      this.loadingService.loading = false;
    });




  }


  // -----------------------------( EDIT PRICE POINT )------------------------------ \\
  editPricePoint(sourceElement: HTMLElement) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.pricePointPopup.show = true;
  }
}