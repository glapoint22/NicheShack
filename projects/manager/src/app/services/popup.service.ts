import { Injectable } from '@angular/core';
import { ColorPickerPopupComponent } from '../shared-components/popups/color-picker-popup/color-picker-popup.component';
import { PricePointPopupComponent } from '../pages/niche-shack-editor/product-editor/product-properties/product-content/price-point-popup/price-point-popup.component';
import { HierarchyPopupComponent } from '../shared-components/menu-bar/hierarchy-popup/hierarchy-popup.component';
import { LinkPopupComponent } from '../shared-components/popups/link-popup/link-popup.component';
import { MediaBrowserPopupComponent } from '../shared-components/popups/media-browser-popup/media-browser-popup.component';
import { ProductReportOtherPopupComponent } from '../shared-components/popups/product-report-popups/product-report-other-popup/product-report-other-popup.component';
import { NotificationsPopupComponent } from '../shared-components/popups/notifications-popup/notifications-popup.component';
import { HoplinkPopupComponent } from '../shared-components/popups/hoplink-popup/hoplink-popup.component';

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
  public productReportOtherPopup: ProductReportOtherPopupComponent;
  public hoplinkPopup: HoplinkPopupComponent;
}