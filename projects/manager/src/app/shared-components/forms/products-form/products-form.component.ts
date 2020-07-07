import { Component, OnInit } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { Item } from '../../../classes/item';

@Component({
  selector: 'products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent extends FormComponent implements OnInit {
  public products: Array<Item>;
  

  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.formService.productsForm = this;
  }

}
