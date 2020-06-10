import { Component, Input } from '@angular/core';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { Item } from 'projects/manager/src/app/classes/item';
import { Searchable } from 'projects/manager/src/app/classes/searchable';
import { FormService } from 'projects/manager/src/app/services/form.service';
import { Observable, of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Vendor } from 'projects/manager/src/app/classes/vendor';
import { LoadingService } from 'projects/manager/src/app/services/loading.service';

@Component({
  selector: 'product-vendor',
  templateUrl: './product-vendor.component.html',
  styleUrls: ['./product-vendor.component.scss']
})
export class ProductVendorComponent implements Searchable {
  @Input() vendor: Item;
  public searchUrl: string = 'api/Vendors';
  private subscription: Subscription;

  constructor(private popupService: PopupService, private formService: FormService, private loadingService: LoadingService) { }

  //                                                                 TEMP!!!!!!
  // ******************************************************************************************************************************************
  public getTempVendor(id: string): Observable<Vendor> {
    return of<Vendor>({
      id: 'F5TD6KOQHB',
      name: 'Gumpy\'s',
      webPage: 'http://www.gumpys.com',
      address: {
        street: '110 Feeder Dam Rd',
        city: 'South Glens Falls',
        zip: 12803,
        poBox: 22,
        state: 'NY',
        country: 'USA'
      },
      primaryContact: {
        firstName: 'Gabey',
        lastName: 'Gump',
        officePhone: '518-793-5555',
        mobilePhone: '518-555-5555',
        email: 'ggump@gmail.com'
      },
      secondaryContact: {
        firstName: 'Brony',
        lastName: 'Gump',
        officePhone: '518-793-5555',
        mobilePhone: '518-222-2222',
        email: 'bgump@gmail.com'
      },
      notes: 'It\'s amazing that this dumb company has been around for 20 years. ' +
        'You have to keep after Gabey Gump to do something simple. Don\'t bother emailing him because he won\'t reply. ' +
        'He probably doesn\'t know how to check his email. I\'ve been told they are still using Windows 98 from an HP desktop with a 533 mhz processor.'
    }).pipe(delay(1000));




    // return of<Vendor>({
    //   id: null,
    //   name: null,
    //   webPage: null,
    //   address: {
    //     street: null,
    //     city: null,
    //     zip: null,
    //     poBox: null,
    //     state: null,
    //     country: null
    //   },
    //   primaryContact: {
    //     firstName: null,
    //     lastName: null,
    //     officePhone: null,
    //     mobilePhone: null,
    //     email: null
    //   },
    //   secondaryContact: {
    //     firstName: null,
    //     lastName: null,
    //     officePhone: null,
    //     mobilePhone: null,
    //     email: null
    //   },
    //   notes: null
    // }).pipe(delay(1000));
  }
  // ******************************************************************************************************************************************



  // --------------------------------( ON VENDOR SEARCH CLICK )-------------------------------- \\
  onVendorSearchClick(sourceElement: HTMLElement) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.searchPopup.searchable = this;
    this.popupService.searchPopup.show = !this.popupService.searchPopup.show;
  }


  // --------------------------------( ON VENDOR INFO CLICK )-------------------------------- \\
  onVendorInfoClick() {
    this.loadingService.loading = true;
    this.getTempVendor(this.vendor.id).subscribe((vendor: Vendor) => {
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
