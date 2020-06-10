import { Injectable } from '@angular/core';
import { ColorPickerPopupComponent } from '../shared-components/popups/color-picker-popup/color-picker-popup.component';
import { PricePointPopupComponent } from '../pages/niche-shack-editor/product-editor/product-properties/product-content/price-point-popup/price-point-popup.component';
import { HierarchyPopupComponent } from '../shared-components/menu-bar/hierarchy-popup/hierarchy-popup.component';
import { LinkPopupComponent } from '../shared-components/popups/link-popup/link-popup.component';
import { MediaBrowserPopupComponent } from '../shared-components/popups/media-browser-popup/media-browser-popup.component';
import { ProductReportOtherPopupComponent } from '../shared-components/popups/product-report-popups/product-report-other-popup/product-report-other-popup.component';
import { NotificationsPopupComponent } from '../shared-components/popups/notifications-popup/notifications-popup.component';
import { ProductReportDescriptionPopupComponent } from '../shared-components/popups/product-report-popups/product-report-description-popup/product-report-description-popup.component';
import { ProductReportImagePopupComponent } from '../shared-components/popups/product-report-popups/product-report-image-popup/product-report-image-popup.component';
import { ProductReportMediaPopupComponent } from '../shared-components/popups/product-report-popups/product-report-media-popup/product-report-media-popup.component';
import { ProductReportContentPopupComponent } from '../shared-components/popups/product-report-popups/product-report-content-popup/product-report-content-popup.component';
import { MessageNotificationPopupComponent } from '../shared-components/popups/notifications-popup/message-notification-popup/message-notification-popup.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  public sourceElement: HTMLElement;
  public colorPickerPopup: ColorPickerPopupComponent;
  public pricePointPopup: PricePointPopupComponent;
  public hierarchyPopup: HierarchyPopupComponent;
  public linkPopup: LinkPopupComponent;
  public mediaBrowserPopup: MediaBrowserPopupComponent;
  public notificationsPopup: NotificationsPopupComponent;
  public messageNotificationPopup: MessageNotificationPopupComponent;
  public productReportOtherPopup: ProductReportOtherPopupComponent;
  public productReportDescriptionPopup: ProductReportDescriptionPopupComponent;
  public productReportImagePopup: ProductReportImagePopupComponent;
  public productReportMediaPopup: ProductReportMediaPopupComponent;
  public productReportContentPopup: ProductReportContentPopupComponent;
}