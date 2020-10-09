import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DropdownMenuService } from '../../../../services/dropdown-menu.service';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  constructor(public dropdownMenuService: DropdownMenuService) { }
  @Input() title: string;
  @Input() height: number;
  @Input() selectedIndex: number;
  @Input() dropdownList: Array<KeyValue<any, any>>;
  @Input() disabled: boolean;
  @Output() onChange: EventEmitter<string> = new EventEmitter();
  
  // Public
  public initialSelectedIndex: number;


  // -----------------------------( ON DROPDOWN SELECT )------------------------------ \\
  onDropdownSelect(dropdown: HTMLElement) {
    // Build the menu
    this.buildMenu(dropdown);
    // Record the index of the menu option that is selected for future reference
    this.initialSelectedIndex = this.selectedIndex;
    // Select the menu option in this list that matches the index of the selected index
    this.dropdownMenuService.dropdownMenu.selectedIndex = this.selectedIndex;
  }


  // -----------------------------( BUILD MENU )------------------------------ \\
  buildMenu(dropdown: HTMLElement){
    this.dropdownMenuService.buildMenu(this, dropdown, false, this.dropdownList, this.onMenuOptionSelect, this.onArrowKeyDown, this.restoreSelectedIndexValue);
  }


  // -----------------------------( ON MENU OPTION SELECT )------------------------------ \\
  onMenuOptionSelect() {
    this.selectedIndex = this.dropdownMenuService.dropdownMenu.selectedIndex;
    // Record the index of the menu option that is selected for future reference
    this.initialSelectedIndex = this.selectedIndex;
    this.onChange.emit(this.dropdownMenuService.dropdownMenu.selectedOption.option.value);
  }


  // -----------------------------( ON ARROW KEY DOWN )------------------------------ \\
  onArrowKeyDown() {
    this.selectedIndex = this.dropdownMenuService.dropdownMenu.selectedIndex;
  }


  // -----------------------------( RESTORE SELECTED INDEX VALUE )------------------------------ \\
  restoreSelectedIndexValue() {
    this.selectedIndex = this.initialSelectedIndex;
  }
}