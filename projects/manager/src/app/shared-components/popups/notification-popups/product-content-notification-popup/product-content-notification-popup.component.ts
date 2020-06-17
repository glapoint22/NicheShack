import { Component } from '@angular/core';
import { GeneralNotificationPopupComponent } from '../general-notification-popup/general-notification-popup.component';
import { Notification } from 'projects/manager/src/app/classes/notification';
import { Item } from 'projects/manager/src/app/classes/item';

@Component({
  selector: 'product-content-notification-popup',
  templateUrl: './product-content-notification-popup.component.html',
  styleUrls: ['../../popup/popup.component.scss', '../message-notification-popup/message-notification-popup.component.scss', './product-content-notification-popup.component.scss']
})
export class ProductContentNotificationPopupComponent extends GeneralNotificationPopupComponent {
  public checkList = [];
  public contentIndex: number = 0;
  public pricePointList: Array<Item>;

  // --------------------------------( INITIALIZE POPUP )-------------------------------- \\
  initializePopup() {
    this.popupService.productContentNotificationPopup = this;
  }


  // --------------------------------( SET POPUP )-------------------------------- \\
  setPopup() {
    // let priceIndices: Array<Array<number>>;
    let formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    this.paginatorIndex = this.notificationService.productContentNotification.customerText.length - 1;
    
    // Map the content's price indices into a stand alone array
    // if (this.notificationService.productContentNotification.content) {
    //   priceIndices = this.notificationService.productContentNotification.content.map(x => (x.priceIndices));
    // }

    // Combine all the price point properties into one string
    if (this.notificationService.productContentNotification.pricePoints) {
      this.pricePointList = this.notificationService.productContentNotification.pricePoints.map(x => ({

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
    // if (this.notificationService.productContentNotification.content && this.notificationService.productContentNotification.pricePoints) {
    //   for (let i = 0; i < priceIndices.length; i++) {
    //     this.checkList[i] = [];

    //     for (let j = 0; j < this.notificationService.productContentNotification.pricePoints.length; j++) {
    //       this.checkList[i].push(priceIndices[i].indexOf(j) != -1 ? true : false)
    //     }
    //   }
    // }
  }


  // -----------------------------( ADD PRICE POINT )------------------------------ \\
  addPricePoint(sourceElement: HTMLElement) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.pricePointPopup.show = true;
  }


  // -----------------------------( EDIT PRICE POINT )------------------------------ \\
  editPricePoint(sourceElement: HTMLElement) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.pricePointPopup.show = true;
  }


  // -----------------------------(ON SUBMIT )------------------------------ \\
  onSubmit(notification: Notification) {

  }
}