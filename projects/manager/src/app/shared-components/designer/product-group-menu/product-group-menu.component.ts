import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'product-group-menu',
  templateUrl: './product-group-menu.component.html',
  styleUrls: ['./product-group-menu.component.scss']
})
export class ProductGroupMenuComponent implements OnInit {
  public showProductGroupMenu: boolean;

  constructor() { }

  ngOnInit() {
  }

}
