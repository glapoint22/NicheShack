import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { ProductPricePoint } from 'projects/manager/src/app/classes/product-price-point';
import { ProductContent } from 'projects/manager/src/app/classes/product-content';
import { PanelComponent } from 'projects/manager/src/app/shared-components/panels/panel/panel.component';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { Item } from 'projects/manager/src/app/classes/item';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LoadingService } from 'projects/manager/src/app/services/loading.service';
import { CheckboxItemListComponent } from 'projects/manager/src/app/shared-components/item-lists/checkbox-item-list/checkbox-item-list.component';
import { PromptService } from 'projects/manager/src/app/services/prompt.service';
import { ProductService } from 'projects/manager/src/app/services/product.service';
import { PaginatorComponent } from 'projects/manager/src/app/shared-components/paginator/paginator.component';

@Component({
  selector: 'product-content',
  templateUrl: './product-content.component.html',
  styleUrls: ['./product-content.component.scss']
})
export class ProductContentComponent implements OnChanges {
  public contentIndex: number = 0;
  public pricePointList: Array<Item>;
  @Input() content: Array<ProductContent>;
  @Input() pricePoints: Array<ProductPricePoint>;
  @ViewChild('panel', { static: false }) panel: PanelComponent;


  constructor(public popupService: PopupService, private loadingService: LoadingService, private promptService: PromptService, private productService: ProductService) { }



  //                                                                 TEMP!!!!!!
  // ******************************************************************************************************************************************
  public addTemp(): Observable<string> {
    return of('YGFDSFSDAFW').pipe(delay(1000));
  }
  // ******************************************************************************************************************************************


  // -----------------------------( NG ON CHANGES )------------------------------ \\
  ngOnChanges() {
    let formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

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
  }


  // -----------------------------( ADD PRICE POINT )------------------------------ \\
  addPricePoint(sourceElement: HTMLElement) {
    this.loadingService.loading = true;

    this.addTemp().subscribe((id: string) => {
      // Create the new price point
      let pricePoint: ProductPricePoint = {
        id: id,
        textBefore: '',
        textAfter: '',
        wholeNumber: 0,
        decimal: 0
      }

      // Show the price point popup
      this.popupService.sourceElement = sourceElement;
      this.popupService.pricePointPopup.show = true;


      // Push the new price point
      this.pricePoints.push(pricePoint);
      this.pricePointList.push({
        id: pricePoint.id,
        name: ''
      });

      // Set the reference to this new price point
      this.popupService.pricePointPopup.pricePoint = pricePoint;
      this.popupService.pricePointPopup.pricePointListItem = this.pricePointList[this.pricePointList.length - 1];

      // This will set the new price point in the product properties
      this.popupService.pricePointPopup.setPricePointListItem();

      this.loadingService.loading = false;
    });
  }


  // -----------------------------( EDIT PRICE POINT )------------------------------ \\
  editPricePoint(sourceElement: HTMLElement, index: number) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.pricePointPopup.show = true;
    this.popupService.pricePointPopup.pricePoint = this.pricePoints[index];
    this.popupService.pricePointPopup.pricePointListItem = this.pricePointList[index];
  }





  // -----------------------------( ON DELETE PRICE POINT )------------------------------ \\
  onDeletePricePoint(itemList: CheckboxItemListComponent) {
    this.promptService.showPrompt('Delete Price Point', 'Are you sure you want to delete this price point?', this.deletePricePoint, this, [itemList]);
  }






  // -----------------------------( DELETE PRICE POINT )------------------------------ \\
  deletePricePoint(itemList: CheckboxItemListComponent) {
    this.pricePoints.splice(itemList.selectedListItemIndex, 1);
    itemList.removeListItem();
    this.productService.setPrice();
  }





  // -----------------------------( ADD CONTENT )------------------------------ \\
  addContent(paginator: PaginatorComponent) {
    this.loadingService.loading = true;
    this.addTemp().subscribe((id: string) => {
      this.loadingService.loading = false;

      this.productService.product.content.push({
        id: id,
        icon: null,
        title: null,
        priceIndices: []
      });

      paginator.currentIndex = this.contentIndex = this.productService.product.content.length - 1;
    });

  }



  // -----------------------------( ON DELETE CONTENT )------------------------------ \\
  onDeleteContent(paginator: PaginatorComponent) {
    this.promptService.showPrompt('Delete Content', 'Are you sure you want to delete this content?', this.deleteContent, this, [paginator]);
  }





  // -----------------------------( DELETE CONTENT )------------------------------ \\
  deleteContent(paginator: PaginatorComponent) {
    this.productService.product.content.splice(this.contentIndex, 1);

    // Set the index of the previous content
    paginator.currentIndex = Math.max(0, this.contentIndex = Math.min(this.productService.product.content.length - 1, this.contentIndex));
  }
}