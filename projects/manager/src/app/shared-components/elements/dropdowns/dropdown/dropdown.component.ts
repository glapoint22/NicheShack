import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { DropdownMenuService } from '../../../../services/dropdown-menu.service';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  constructor(public dropdownMenuService: DropdownMenuService) { }
  @Input() width: number;
  @Input() title: string;
  @Input() height: number;
  @Input() selectedIndex: number;
  @Input() keyValue: KeyValue<string, string>[];
  @ViewChild('base', { static: false }) base: ElementRef;
  @Output() onChange: EventEmitter<string> = new EventEmitter();
  
  // Public
  public initialSelectedIndex: number;


  // -----------------------------( ON DROPDOWN SELECT )------------------------------ \\
  onDropdownSelect() {
    // Build the menu
    this.buildMenu();
    // Record the index of the menu option that is selected for future reference
    this.initialSelectedIndex = this.selectedIndex;
    // Select the menu option in this list that matches the index of the selected index
    this.dropdownMenuService.selectedIndex = this.selectedIndex;
  }


  // -----------------------------( BUILD MENU )------------------------------ \\
  buildMenu(){
    this.dropdownMenuService.buildMenu(this, this.base.nativeElement, false, this.keyValue, this.onMenuOptionSelect, this.onArrowKeyDown, this.restoreSelectedIndexValue);
  }


  // -----------------------------( ON MENU OPTION SELECT )------------------------------ \\
  onMenuOptionSelect() {
    this.onChange.emit(this.keyValue[this.dropdownMenuService.selectedIndex].value);
    this.selectedIndex = this.dropdownMenuService.selectedIndex;
    // Record the index of the menu option that is selected for future reference
    this.initialSelectedIndex = this.selectedIndex;
  }


  // -----------------------------( ON ARROW KEY DOWN )------------------------------ \\
  onArrowKeyDown() {
    this.selectedIndex = this.dropdownMenuService.selectedIndex;
  }


  // -----------------------------( RESTORE SELECTED INDEX VALUE )------------------------------ \\
  restoreSelectedIndexValue() {
    this.selectedIndex = this.initialSelectedIndex;
  }
}
