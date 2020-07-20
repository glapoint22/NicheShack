import { Component, OnInit, ViewChild } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { ItemListOptions } from '../../../classes/item-list-options';
import { MenuOption } from '../../../classes/menu-option';
import { ProductListItem } from '../../../classes/product-list-item';
import { ItemListComponent } from '../../item-lists/item-list/item-list.component';
import { FormService } from '../../../services/form.service';
import { PopupService } from '../../../services/popup.service';
import { NicheShackHierarchyItemType } from '../../../classes/hierarchy-item';

@Component({
  selector: 'products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent extends FormComponent implements OnInit {
  @ViewChild('itemList', { static: false }) itemList: ItemListComponent;
  public products: Array<ProductListItem>;
  public itemListOptions: ItemListOptions;

  constructor(formService: FormService, private popupService: PopupService) { super(formService) }


  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.formService.productsForm = this;

    // Define the item list options
    this.itemListOptions = {
      // Current Object
      currentObj: this,
      // Menu Options
      menuOptions: () => {
        return [
          // Go to product page
          new MenuOption('Go To Product Page', false, () => {
            this.popupService.nicheShackHierarchyPopup.openItem(this.products[this.itemList.selectedListItemIndex].id,
              NicheShackHierarchyItemType.Product);

              this.formService.vendorForm.close();
              this.show = false;
          }),


          // Go to vendor page
          new MenuOption('Go To Vendor Product Page', false, () => {
            window.open(this.products[this.itemList.selectedListItemIndex].hoplink);
          })
        ]
      },
      multiSelect: false
    }
  }
}
