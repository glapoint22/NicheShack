import { Injectable } from '@angular/core';
import { MenuOptions } from '../classes/menu-options';
import { Menu, MenuType } from '../classes/menu';
import { MainMenu } from '../classes/main-menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public menu: MainMenu = new MainMenu();


  // -----------------------------( BUILD MENU )------------------------------ \\
  buildMenu(currentObj: object, left: number, top: number, mainMenuOptions: MenuOptions[]) {
    this.menu.menus = [];
    this.menu.isVisible = true;
    this.menu.allowHide = false;
    this.menu.currentObj = currentObj;

    // Create the main menu
    this.menu.menus.push(new Menu(this.menu.menus.length, MenuType.MainMenu, left, top, true));

    // Create the sub menus(if any)
    mainMenuOptions.forEach((mainMenuOption: MenuOptions) => {
      mainMenuOption.createOption(this.menu.menus[0].options, this.menu.menus);
    });
  }
}