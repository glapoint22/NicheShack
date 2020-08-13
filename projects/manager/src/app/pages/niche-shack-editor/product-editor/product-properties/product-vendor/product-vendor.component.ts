import { Component, Input } from '@angular/core';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { Item } from 'projects/manager/src/app/classes/item';
import { Searchable } from 'projects/manager/src/app/classes/searchable';
import { FormService } from 'projects/manager/src/app/services/form.service';
import { Subscription } from 'rxjs';
import { Vendor } from 'projects/manager/src/app/classes/vendor';
import { LoadingService } from 'projects/manager/src/app/services/loading.service';
import { Product } from 'projects/manager/src/app/classes/product';
import { SaveService } from 'projects/manager/src/app/services/save.service';
import { DataService } from 'services/data.service';

@Component({
  selector: 'product-vendor',
  templateUrl: './product-vendor.component.html',
  styleUrls: ['./product-vendor.component.scss']
})
export class ProductVendorComponent implements Searchable {
  @Input() product: Product;
  public apiUrl: string = 'api/Vendors';
  public searchResults: Array<Item>;
  public items: Array<Item>;
  private subscription: Subscription;

  constructor(
    private popupService: PopupService,
    private formService: FormService,
    private loadingService: LoadingService,
    private dataService: DataService,
    private saveService: SaveService
  ) { }


  // --------------------------------( ON VENDOR SEARCH CLICK )-------------------------------- \\
  onVendorSearchClick(sourceElement: HTMLElement) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.searchPopup.searchable = this;
    this.popupService.searchPopup.show = !this.popupService.searchPopup.show;
  }


  // --------------------------------( ON VENDOR INFO CLICK )-------------------------------- \\
  openVendorForm() {
    // Subscribe to when a new vendor is submitted
    if (this.subscription) this.subscription.unsubscribe();
    this.subscription = this.formService.vendorForm.onSubmit.subscribe((vendor: Item) => {
      this.setSearchItem(vendor);
    });


    if (this.product.vendor.id != 0) {
      this.loadingService.loading = true;
      this.dataService.get(this.apiUrl + '/Vendor', [{ key: 'vendorId', value: this.product.vendor.id }])
        .subscribe((vendor: Vendor) => {
          // Give the vendor info to the vendor form
          this.formService.vendorForm.vendor = vendor;

          // Hide the loading screen and show the vendor form
          this.loadingService.loading = false;
          this.formService.vendorForm.show = true;


        });
    } else {
      this.formService.vendorForm.editMode = true;
      this.formService.vendorForm.show = true;
    }

  }


  // --------------------------------( SET SEARCH ITEM )-------------------------------- \\
  setSearchItem(vendor: Item) {
    if (!this.product.vendor || this.product.vendor.id != vendor.id) {
      this.product.vendor = vendor;

      // Update the vendor
      this.saveService.save({
        url: 'api/Products/Vendor',
        data: {
          itemId: this.product.id,
          propertyId: this.product.vendor.id
        }
      });
    }
  }
}