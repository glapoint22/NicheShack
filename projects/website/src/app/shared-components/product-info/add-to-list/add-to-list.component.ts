import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { KeyValue } from '@angular/common';
import { DataService } from 'services/data.service';
import { Router } from '@angular/router';
import { ProductInfo } from '../../../interfaces/product-info';

@Component({
  selector: 'add-to-list',
  templateUrl: './add-to-list.component.html',
  styleUrls: ['./add-to-list.component.scss']
})
export class AddToListComponent {
  @Input() productInfo: ProductInfo;
  @Output() onCreateListClick: EventEmitter<void> = new EventEmitter();
  public show: boolean;
  public lists: Array<KeyValue<string, string>>;
  public selectedList: KeyValue<string, string>;
  public submitted: boolean;
  public isDuplicate: boolean;

  constructor(private dataService: DataService, private router: Router) { }


  onShow() {
    this.lists = [];
    this.dataService.get('api/Lists/DropdownLists')
      .subscribe(lists => {
        lists.forEach(list => {
          this.lists.push({
            key: list.name,
            value: list.id
          });
        });

        this.lists.unshift({
          key: 'Select your list',
          value: ''
        });

        this.selectedList = this.lists[0];
        this.submitted = false;
        this.isDuplicate = false;
      });
  }



  onSubmit() {
    this.dataService.post('api/Lists/AddProduct', { productId: this.productInfo.product.id, listId: this.selectedList.value })
      .subscribe((isDuplicate: boolean) => {
        if (isDuplicate) {
          this.isDuplicate = true;
        } else {
          this.submitted = true;
        }
      });


  }

  



  onViewListClick() {
    this.router.navigate(['account', 'lists', this.selectedList.value]);
  }
}


