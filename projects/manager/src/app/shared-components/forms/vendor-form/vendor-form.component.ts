import { Component, OnInit } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { Vendor } from '../../../classes/vendor';
import { FormService } from '../../../services/form.service';
import { MenuService } from '../../../services/menu.service';
import { Subject } from 'rxjs';
import { Item } from '../../../classes/item';
import { PromptService } from '../../../services/prompt.service';
import { TempDataService } from '../../../services/temp-data.service';
import { LoadingService } from '../../../services/loading.service';
import { ProductService } from '../../../services/product.service';
import { PopupService } from '../../../services/popup.service';
import { Searchable } from '../../../classes/searchable';

@Component({
  selector: 'vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.scss']
})
export class VendorFormComponent extends FormComponent implements OnInit, Searchable {
  public vendor: Vendor = new Vendor();
  public editMode: boolean;
  public onSubmit = new Subject<Item>();
  public apiUrl: string = 'api/Vendors';
  public searchResults: Array<Item>;
  public items: Array<Item>;

  constructor(
    formService: FormService,
    private menuService: MenuService,
    private promptService: PromptService,
    private dataService: TempDataService,
    private loadingService: LoadingService,
    private productService: ProductService,
    private popupService: PopupService
  ) { super(formService) }





  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.formService.vendorForm = this;
  }



  // --------------------------------( ON SHOW )-------------------------------- \\
  onShow() {
    if (!this.vendor) {
      this.editMode = true;
    }
  }


  // --------------------------------( SHOW MENU )-------------------------------- \\
  showMenu(element: HTMLElement) {
    window.setTimeout(() => {
      this.menuService.buildMenu(this, element.getBoundingClientRect().left + 20, element.getBoundingClientRect().top,
        this.menuService.option('Add Vendor', null, this.editMode, () => this.addVendor()),
        this.menuService.option('Edit Vendor', null, !this.vendor.id || this.editMode, () => this.editMode = true),
        this.menuService.option('Delete Vendor', null, !this.vendor.id || this.editMode, () => {
          this.promptService.showPrompt('Delete Vendor',
            'Are you sure you want to delete "' + this.vendor.name + '" and its products?', () => this.deleteVendor(), this);
        }),
        this.menuService.divider(),
        this.menuService.option("Go To Web Page", null, this.vendor.webPage == null, () => window.open(this.vendor.webPage)),
        this.menuService.divider(),
        this.menuService.option("View Product List", null, !this.vendor.id, () => { }),
        this.menuService.divider(),
        this.menuService.option("Close", null, false, () => this.close())
      );
    });
  }


  // --------------------------------( ON ESCAPE KEY DOWN )-------------------------------- \\
  onEscapeKeydown() {
    if (!this.menuService.showMenu) super.onEscapeKeydown();
  }





  // --------------------------------( ON SUBMIT CLICK )-------------------------------- \\
  onSubmitClick() {
    this.loadingService.loading = true;

    if (this.vendor.id) {
      this.dataService.put(this.apiUrl, this.vendor)
        .subscribe(() => {
          this.editMode = false;
          this.loadingService.loading = false;

          this.onSubmit.next({
            id: this.vendor.id,
            name: this.vendor.name
          });
        });
    } else {
      this.dataService.post(this.apiUrl, this.vendor)
        .subscribe((id: string) => {
          // New Id and name from the server
          this.onSubmit.next({
            id: id,
            name: this.vendor.name
          });
          this.editMode = false;
          this.vendor.id = id;
          this.loadingService.loading = false;
        });
    }
  }






  // --------------------------------( ADD VENDOR )-------------------------------- \\
  addVendor() {
    this.vendor = new Vendor();
    this.editMode = true;
  }





  // --------------------------------( CLOSE )-------------------------------- \\
  close() {
    if (this.editMode) {
      this.promptService.showPrompt('Close',
        'Any changes you have made will be lost. Are you sure you want to proceed?', () => {
          this.editMode = false;
          this.close();
        }, this);
    } else {
      this.vendor = new Vendor();
      this.show = false;
    }
  }







  // --------------------------------( DELETE VENDOR )-------------------------------- \\
  deleteVendor() {
    this.loadingService.loading = true;
    this.dataService.delete(this.apiUrl, this.vendor.id)
      .subscribe(() => {
        this.loadingService.loading = false;

        // If we have a selected product and the product is from this vendor, remove from view
        if (this.productService.product) {
          if (this.productService.product.vendor.id == this.vendor.id) {
            this.popupService.nicheShackHierarchyPopup.selectedItem = null;
            this.productService.product = null;
          }
        }


        // This will force a refresh when the niche shack hierarchy popup is opened
        // This is needed to remove any products from this vendor
        this.popupService.nicheShackHierarchyPopup.items = null;

        this.items = null;
        this.searchResults = null;

        // Clear the vendor
        this.vendor = new Vendor();
      });
  }





  // --------------------------------( ON VENDOR SEARCH CLICK )-------------------------------- \\
  onVendorSearchClick(sourceElement: HTMLElement) {
    if (this.editMode) return;

    this.popupService.sourceElement = sourceElement;
    this.popupService.searchPopup.searchable = this;
    this.popupService.searchPopup.show = !this.popupService.searchPopup.show;
  }







  // --------------------------------( SET SEARCH ITEM )-------------------------------- \\
  setSearchItem(vendor: any) {
    this.vendor = vendor;
  }
}