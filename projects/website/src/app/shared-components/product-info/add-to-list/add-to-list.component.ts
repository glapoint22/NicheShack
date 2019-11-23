import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'add-to-list',
  templateUrl: './add-to-list.component.html',
  styleUrls: ['./add-to-list.component.scss']
})
export class AddToListComponent implements OnInit {
  @Input() product: Product;
  @Output() onCreateListClick: EventEmitter<void> = new EventEmitter();
  public show: boolean;
  public lists: Array<KeyValue<string, string>>;
  public selectedList: KeyValue<string, string>;
  public submitted: boolean;

  constructor() { }

  ngOnInit() {
    this.lists = [
      {
        key: 'QOGTUMWTSG',
        value: 'Favorites',
      },
      {
        key: 'KEOFUJWJCE',
        value: 'Shopping'
      }
    ]

    // Add this at the beginning of the list
    this.lists.unshift({
      key: '',
      value: 'Select your list'
    });

    this.setDefault();
  }

  onSubmit() {
    this.submitted = true;
    
  }

  setDefault() {
    this.selectedList = this.lists[0];
    this.submitted = false;
  }
}


