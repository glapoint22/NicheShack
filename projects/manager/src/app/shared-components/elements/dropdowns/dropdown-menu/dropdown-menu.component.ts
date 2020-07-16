import { Component, HostListener } from '@angular/core';
import { DropdownMenuService } from 'projects/manager/src/app/services/dropdown-menu.service';

@Component({
  selector: 'dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent {
  constructor(public dropdownMenuService: DropdownMenuService) { }

  // -----------------------------( ON KEY DOWN )------------------------------ \\
  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {

    // Escape
    if (event.code === 'Escape' || event.keyCode === 27) {
      this.dropdownMenuService.dropdownMenu.onEscape();
    }

    // Enter
    if (event.code === 'Enter' || event.code === 'NumpadEnter' || event.keyCode === 13) {
      this.dropdownMenuService.dropdownMenu.onEnter();
    }

    // Arrow Up
    if(event.code === 'ArrowUp' || event.keyCode === 38) {
      this.dropdownMenuService.dropdownMenu.onUpArrow();
    }

    // Arrow Down
    if(event.code === 'ArrowDown' || event.keyCode === 40) {
      this.dropdownMenuService.dropdownMenu.onDownArrow();
    }
  }
}