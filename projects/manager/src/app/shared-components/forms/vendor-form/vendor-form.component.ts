import { Component, OnInit } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { Vendor } from '../../../classes/vendor';
import { FormService } from '../../../services/form.service';
import { MenuService } from '../../../services/menu.service';
import { Subject } from 'rxjs';
import { Item } from '../../../classes/item';
import { LoadingService } from '../../../services/loading.service';
import { ProductService } from '../../../services/product.service';
import { PopupService } from '../../../services/popup.service';
import { Searchable } from '../../../classes/searchable';
import { MenuOption } from '../../../classes/menu-option';
import { MenuDivider } from '../../../classes/menu-divider';
import { ProductListItem } from '../../../classes/product-list-item';
import { DataService } from 'services/data.service';
import { PromptService } from 'services/prompt.service';

@Component({
  selector: 'vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.scss']
})
export class VendorFormComponent extends FormComponent implements OnInit, Searchable<Item> {
  public vendor: Vendor = new Vendor();
  public editMode: boolean;
  public onSubmit = new Subject<Item>();
  public apiUrl: string = 'api/Vendors';

  constructor(
    formService: FormService,
    private menuService: MenuService,
    private promptService: PromptService,
    private dataService: DataService,
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
        [
          new MenuOption('Add Vendor', this.editMode, () => this.addVendor()),
          new MenuOption('Edit Vendor', !this.vendor.id || this.editMode, () => this.editMode = true),
          new MenuOption('Delete Vendor', !this.vendor.id || this.editMode, () => {
            this.promptService.showPrompt('Delete Vendor',
              'Are you sure you want to delete "' + this.vendor.name + '" and its products?', () => this.deleteVendor(), this);
          }),
          new MenuDivider(),
          new MenuOption("Go To Web Page", this.vendor.webPage == null, () => window.open(this.vendor.webPage)),
          new MenuDivider(),
          new MenuOption("View Product List", !this.vendor.id, () => this.getProducts()),
          new MenuDivider(),
          new MenuOption("Close", false, () => this.close())
        ]
      );
    });
  }


  // --------------------------------( ON ESCAPE KEY DOWN )-------------------------------- \\
  onEscapeKeydown() {
    if (!this.menuService.menu.isVisible && !this.formService.productsForm.show) super.onEscapeKeydown();
  }





  // --------------------------------( ON SUBMIT CLICK )-------------------------------- \\
  onSubmitClick() {
    this.loadingService.loading = true;

    if (this.vendor.id) {
      this.dataService.put(this.apiUrl + '/Vendor', this.vendor)
        .subscribe(() => {
          this.editMode = false;
          this.loadingService.loading = false;

          this.onSubmit.next({
            id: this.vendor.id,
            name: this.vendor.name
          });
        });
    } else {
      this.dataService.post(this.apiUrl + '/Vendor', this.vendor)
        .subscribe((id: number) => {
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
      this.formService.productsForm.products = null;
      super.close();
    }
  }







  // --------------------------------( DELETE VENDOR )-------------------------------- \\
  deleteVendor() {
    this.loadingService.loading = true;
    this.dataService.delete(this.apiUrl, {vendorId: this.vendor.id})
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
  setSearchItem(vendor: Item) {
    this.loadingService.loading = true;

    this.dataService.get(this.apiUrl + '/Vendor', [{ key: 'vendorId', value: vendor.id }])
      .subscribe((vendor: Vendor) => {
        this.vendor = vendor;
        this.loadingService.loading = false;
        this.formService.productsForm.products = null;
      });
  }



  getProducts() {
    if (!this.formService.productsForm.products) {
      this.loadingService.loading = true;


      this.dataService.get('api/Vendors/Products', [{ key: 'vendorId', value: this.vendor.id }])
        .subscribe((products: Array<ProductListItem>) => {
          this.formService.productsForm.products = products;
          this.loadingService.loading = false;
          this.formService.productsForm.show = true;
        });
    } else {
      this.formService.productsForm.show = true;
    }




  }
}