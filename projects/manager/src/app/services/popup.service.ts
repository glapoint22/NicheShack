import { Injectable } from '@angular/core';
import { ColorPickerPopupComponent } from '../shared-components/popups/color-picker-popup/color-picker-popup.component';
import { LinkPopupComponent } from '../shared-components/popups/link-popup/link-popup.component';
import { MediaBrowserPopupComponent } from '../shared-components/popups/media-browser-popup/media-browser-popup.component';
import { NotificationListPopupComponent } from '../shared-components/popups/notification-popups/notification-list-popup/notification-list-popup.component';
import { GeneralNotificationPopupComponent } from '../shared-components/popups/notification-popups/general-notification-popup/general-notification-popup.component';
import { ProductDescriptionNotificationPopupComponent } from '../shared-components/popups/notification-popups/product-description-notification-popup/product-description-notification-popup.component';
import { ProductImageNotificationPopupComponent } from '../shared-components/popups/notification-popups/product-image-notification-popup/product-image-notification-popup.component';
import { ProductMediaNotificationPopupComponent } from '../shared-components/popups/notification-popups/product-media-notification-popup/product-media-notification-popup.component';
import { ProductContentNotificationPopupComponent } from '../shared-components/popups/notification-popups/product-content-notification-popup/product-content-notification-popup.component';
import { HoplinkPopupComponent } from '../shared-components/popups/hoplink-popup/hoplink-popup.component';
import { SearchPopupComponent } from '../shared-components/popups/search-popup/search-popup.component';
import { MessageNotificationPopupComponent } from '../shared-components/popups/notification-popups/message-notification-popup/message-notification-popup.component';
import { ReviewComplaintNotificationPopupComponent } from '../shared-components/popups/notification-popups/review-complaint-notification-popup/review-complaint-notification-popup.component';
import { NicheShackHierarchyPopupComponent } from '../shared-components/popups/niche-shack-hierarchy-popup/niche-shack-hierarchy-popup.component';
import { MediaType } from '../classes/media';
import { HighlightPopupComponent } from '../shared-components/popups/highlight-popup/highlight-popup.component';


@Injectable({
  providedIn: 'root'
})
export class PopupService {
  public bottomBuffer: number = 20;
  public sourceElement: HTMLElement;
  public colorPickerPopup: ColorPickerPopupComponent;
  public linkPopup: LinkPopupComponent;
  public mediaBrowserPopup: MediaBrowserPopupComponent;
  public mediaType: MediaType;
  public notificationListPopup: NotificationListPopupComponent;
  public messageNotificationPopup: MessageNotificationPopupComponent;
  public generalNotificationPopup: GeneralNotificationPopupComponent;
  public reviewComplaintNotificationPopup: ReviewComplaintNotificationPopupComponent;
  public productDescriptionNotificationPopup: ProductDescriptionNotificationPopupComponent;
  public productImageNotificationPopup: ProductImageNotificationPopupComponent;
  public productMediaNotificationPopup: ProductMediaNotificationPopupComponent;
  public productContentNotificationPopup: ProductContentNotificationPopupComponent;
  public hoplinkPopup: HoplinkPopupComponent;
  public searchPopup: SearchPopupComponent<any>;
  public nicheShackHierarchyPopup: NicheShackHierarchyPopupComponent;
  public highlightPopup: HighlightPopupComponent;
}