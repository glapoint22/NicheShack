import { Component, Input } from '@angular/core';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { Item } from 'projects/manager/src/app/classes/item';
import { Searchable } from 'projects/manager/src/app/classes/searchable';
import { FormService } from 'projects/manager/src/app/services/form.service';
import { Subscription } from 'rxjs';
import { Vendor } from 'projects/manager/src/app/classes/vendor';
import { LoadingService } from 'projects/manager/src/app/services/loading.service';
import { TempDataService } from 'projects/manager/src/app/services/temp-data.service';

@Component({
  selector: 'product-vendor',
  templateUrl: './product-vendor.component.html',
  styleUrls: ['./product-vendor.component.scss']
})
export class ProductVendorComponent implements Searchable {
  @Input() vendor: Item;
  public searchUrl: string = 'api/Vendors';
  private subscription: Subscription;

  constructor(
    private popupService: PopupService,
    private formService: FormService,
    private loadingService: LoadingService,
    private dataService: TempDataService) { }


  // --------------------------------( ON VENDOR SEARCH CLICK )-------------------------------- \\
  onVendorSearchClick(sourceElement: HTMLElement) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.searchPopup.searchable = this;
    this.popupService.searchPopup.show = !this.popupService.searchPopup.show;
  }


  // --------------------------------( ON VENDOR INFO CLICK )-------------------------------- \\
  onVendorInfoClick() {
    this.loadingService.loading = true;
    this.dataService.get(this.searchUrl, [{ key: 'id', value: this.vendor.id }])
      .subscribe((vendor: Vendor) => {
        // Give the vendor info to the vendor form
        this.formService.vendorForm.vendor = vendor;

        // Hide the loading screen and show the vendor form
        this.loadingService.loading = false;
        this.formService.vendorForm.show = true;

        // Subscribe to when a new vendor is submitted
        if (this.subscription) this.subscription.unsubscribe();
        this.subscription = this.formService.vendorForm.onSubmit.subscribe((vendor: Item) => {
          this.setSearchItem(vendor);
        });
      });
  }


  // --------------------------------( SET SEARCH ITEM )-------------------------------- \\
  setSearchItem(vendor: any) {
    this.vendor = vendor;
  }
}