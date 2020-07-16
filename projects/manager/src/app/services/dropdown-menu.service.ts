import { Injectable } from '@angular/core';
import { DropdownMenu } from '../classes/dropdown-menu';
import { KeyValue } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DropdownMenuService {
  public dropdownMenu: DropdownMenu = new DropdownMenu();


  // -----------------------------( BUILD MENU )------------------------------ \\
  buildMenu(currentObj: object, dropdown: HTMLElement, isEditable: boolean, dropdownList: Array<KeyValue<any, any>>, optionSelectFunction: Function, arrowKeyFunction: Function, restoreIndexFunction: Function) {
    // Intitialize the dropdown menu
    this.dropdownMenu.initialize(currentObj, dropdown, isEditable, dropdownList, optionSelectFunction, arrowKeyFunction, restoreIndexFunction);
  }
}