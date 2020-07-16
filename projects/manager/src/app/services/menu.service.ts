import { Injectable } from '@angular/core';
import { MenuOptions } from '../classes/menu-options';
import { MainMenu } from '../classes/main-menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public menu: MainMenu = new MainMenu();

  // -----------------------------( BUILD MENU )------------------------------ \\
  buildMenu(currentObj: object, left: number, top: number, mainMenuOptions: MenuOptions[]) {
    // Intitialize the menu
    this.menu.initialize(currentObj, left, top, mainMenuOptions);
  }
}