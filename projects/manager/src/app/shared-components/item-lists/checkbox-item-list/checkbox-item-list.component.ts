import { Component, Input } from '@angular/core';
import { ItemListComponent } from '../item-list/item-list.component';
import { SelectType } from '../../../classes/list-item-select-type';

@Component({
  selector: 'checkbox-item-list',
  templateUrl: './checkbox-item-list.component.html',
  styleUrls: ['../item-list/item-list.component.scss']
})
export class CheckboxItemListComponent extends ItemListComponent {
  @Input() checkList: Array<boolean>;
  public selectType: typeof SelectType = SelectType;
}