import { Component, Input } from '@angular/core';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { Item } from 'projects/manager/src/app/classes/item';
import { Searchable } from 'projects/manager/src/app/classes/searchable';

@Component({
  selector: 'product-vendor',
  templateUrl: './product-vendor.component.html',
  styleUrls: ['./product-vendor.component.scss']
})
export class ProductVendorComponent implements Searchable {
  @Input() vendor: Item;
  public searchUrl: string = 'api/Vendors';

  constructor(private popupService: PopupService) { }

  onVendorSearchClick(sourceElement: HTMLElement) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.searchPopup.searchable = this;
    this.popupService.searchPopup.show = !this.popupService.searchPopup.show;
  }

  setSearchItem(searchItem: any) {
    this.vendor = searchItem;
  }
}
