import { Component, HostListener } from '@angular/core';
import { DropdownMenuService } from 'projects/manager/src/app/services/dropdown-menu.service';

@Component({
  selector: 'dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent {
  constructor(public dropdownMenuService: DropdownMenuService) { }

  // -----------------------------( HOST LISTENER )------------------------------ \\
  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.code === 'Escape' || event.keyCode === 27) {
      this.dropdownMenuService.showMenu = false;
      this.dropdownMenuService.onArrowKeyDown(this.dropdownMenuService.selectedIndex);
    }

    if (event.code === 'Enter' || event.code === 'NumpadEnter' || event.keyCode === 13) {
      this.dropdownMenuService.showMenu = false;
      this.dropdownMenuService.onMenuOptionSelect(this.dropdownMenuService.selectedIndex);
    }

    if(event.code === 'ArrowUp' || event.keyCode === 38) {
      this.dropdownMenuService.selectedIndex--;
      if(this.dropdownMenuService.selectedIndex < 0) {
        this.dropdownMenuService.selectedIndex = 0;
      }
      this.dropdownMenuService.onArrowKeyDown(this.dropdownMenuService.selectedIndex);
      
    }
    if(event.code === 'ArrowDown' || event.keyCode === 40) {
      this.dropdownMenuService.selectedIndex++;
      if(this.dropdownMenuService.selectedIndex > this.dropdownMenuService.menuOptions.length - 1) {
        this.dropdownMenuService.selectedIndex = this.dropdownMenuService.menuOptions.length - 1;
      }
      this.dropdownMenuService.onArrowKeyDown(this.dropdownMenuService.selectedIndex);
    }
  }
}