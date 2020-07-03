import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { Product } from '../../../classes/product';

@Component({
  selector: 'hoplink-popup',
  templateUrl: './hoplink-popup.component.html',
  styleUrls: ['../popup/popup.component.scss', './hoplink-popup.component.scss']
})
export class HoplinkPopupComponent extends PopupComponent implements OnInit {
  public product: Product;


  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.popupService.hoplinkPopup = this;
  }
}