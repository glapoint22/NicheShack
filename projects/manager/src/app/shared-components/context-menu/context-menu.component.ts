import { Component, HostListener } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent {
  constructor(public menuService: MenuService) { }


  // -----------------------------( HOST LISTENER )------------------------------ \\
  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.code === 'Escape' || event.keyCode === 27) {
      // Loop through all the menus
      for(let i = 0; i < this.menuService.menus.length; i++) {
        // And hide each one
        this.menuService.showMenus[i] = false;
      }
    }
  }
}