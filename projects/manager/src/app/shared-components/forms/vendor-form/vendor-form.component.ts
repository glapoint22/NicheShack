import { Component, OnInit } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { Vendor } from '../../../classes/vendor';
import { FormService } from '../../../services/form.service';
import { MenuService } from '../../../services/menu.service';
import { Subject } from 'rxjs';
import { Item } from '../../../classes/item';

@Component({
  selector: 'vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.scss']
})
export class VendorFormComponent extends FormComponent implements OnInit {
  public vendor: Vendor;
  public editMode: boolean;
  public newVendor: boolean;
  public onSubmit = new Subject<Item>();

  constructor(formService: FormService, private menuService: MenuService) { super(formService) }

  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.formService.vendorForm = this;
  }



  // --------------------------------( ON SHOW )-------------------------------- \\
  onShow() {
    if (!this.vendor.id) {
      this.newVendor = true;
      this.editMode = true;
    }
  }


  // --------------------------------( SHOW MENU )-------------------------------- \\
  showMenu(element: HTMLElement) {
    this.menuService.buildMenu(this, element.getBoundingClientRect().left + 20, element.getBoundingClientRect().top,
      this.menuService.option(this.editMode ? "Turn Off Edit Mode" : "Turn On Edit Mode", null, this.newVendor, () => this.editMode = !this.editMode),
      this.menuService.divider(),
      this.menuService.option("Go To Web Page", null, this.vendor.webPage == null, () => window.open(this.vendor.webPage)),
      this.menuService.divider(),
      this.menuService.option("View Product List", null, this.newVendor, () => { }),
      this.menuService.divider(),
      this.menuService.option("Close", null, false, () => this.show = false)
    );
  }


  // --------------------------------( ON ESCAPE KEY DOWN )-------------------------------- \\
  onEscapeKeydown() {
    if (!this.menuService.showMenu) super.onEscapeKeydown();
  }



  // --------------------------------( ON SUBMIT CLICK )-------------------------------- \\
  onSubmitClick() {
    // New Id and name from the server
    this.onSubmit.next({
      id: 'FSDFSAFSFS',
      name: this.vendor.name
    });
    this.show = false;
  }
}