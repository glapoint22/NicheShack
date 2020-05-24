import { Injectable } from '@angular/core';
import { ColorPickerPopupComponent } from '../shared-components/popups/color-picker-popup/color-picker-popup.component';
import { PricePointPopupComponent } from '../pages/niche-shack-editor/product-editor/product-properties/product-content/price-point-popup/price-point-popup.component';
import { HierarchyPopupComponent } from '../shared-components/menu-bar/hierarchy-popup/hierarchy-popup.component';
import { LinkPopupComponent } from '../shared-components/popups/link-popup/link-popup.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  public sourceElement: HTMLElement;
  public colorPickerPopup: ColorPickerPopupComponent;
  public pricePointPopup: PricePointPopupComponent;
  public hierarchyPopup: HierarchyPopupComponent;
  public linkPopup: LinkPopupComponent;
}