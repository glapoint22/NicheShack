import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { ProductProperties } from '../../../classes/product-properties';

@Component({
  selector: 'hoplink-popup',
  templateUrl: './hoplink-popup.component.html',
  styleUrls: ['./hoplink-popup.component.scss', '../popup/popup.component.scss']
})
export class HoplinkPopupComponent extends PopupComponent implements OnInit {
  public productProperties: ProductProperties;


  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.popupService.hoplinkPopup = this;
  }
}