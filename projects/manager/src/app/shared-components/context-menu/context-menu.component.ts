import { Component, HostListener } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { MenuOptionType } from '../../classes/menu-option-type';

@Component({
  selector: 'context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent {
  constructor(public menuService: MenuService) { }
  public menuOptionType = MenuOptionType;

  // -----------------------------( KEY DOWN )------------------------------ \\
  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.code === 'Escape' || event.keyCode === 27) {
      // Loop through all the menus
      this.menuService.menu.menus.forEach(menu => {
        // And hide each menu
        menu.isVisible = false;
      })
    }
  }
}