import { Component, OnInit } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { Item } from '../../../classes/item';
import { ItemListOptions } from '../../../classes/item-list-options';
import { MenuOption } from '../../../classes/menu-option';

@Component({
  selector: 'products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent extends FormComponent implements OnInit {
  public products: Array<Item>;
  public itemListOptions: ItemListOptions;
  

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
          // New Category
          new MenuOption('Go To Product Page', false, ()=>{}),
          // Delete Category
          new MenuOption('Go To Vendor Product Page', false, ()=>{})
        ]
      },
      multiSelect: false
    }
  }
}
