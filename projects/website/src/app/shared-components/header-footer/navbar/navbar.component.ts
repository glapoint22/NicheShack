import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public searchCategories: Array<KeyValue<string, string>> = []

  constructor() { }

  ngOnInit() {
    this.searchCategories = [
      {
        key: '0',
        value: 'Health & Fitness'
      },
      {
        key: '1',
        value: 'Self-Help'
      },
      {
        key: '2',
        value: 'E-business & E-marketing'
      }
    ]
  }

}
