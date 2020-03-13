import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor() {}
  public menus: any[];
  public showMenu: boolean[];
  private menuLeft: number;
  private subMenuTop: number;
  private parentIndex: number;
  private subMenuIndex: number;
  private subMenuOptionOutTimeout: number[];
  private subMenuOptionOverTimeout: number[];
  
  

  buildMenu(left: number, top: number, width: number, ...mainMenuOptions: any) {
    this.menus = [];
    this.showMenu = [];
    this.subMenuTop = 0;
    this.subMenuIndex = 0;
    this.showMenu[0] = true;
    this.subMenuOptionOutTimeout = [];
    this.subMenuOptionOverTimeout = [];

    // Create the main menu
    this.menus.push({ left: left, top: top, width: width, options: [] });

    // Then create the contents of the main menu
    for (let i in mainMenuOptions) {

      // Divider
      if (mainMenuOptions[i].type == "divider") {
        this.subMenuTop += 12;
        this.menus[0].options.push({ type: mainMenuOptions[i].type });
      }

      // Sub Menu
      if (mainMenuOptions[i].type == "sub menu") {
        this.menuLeft = (left + width) - 3;
        this.parentIndex = 0;
        this.subMenuIndex++;
        this.menus[0].options.push({ type: mainMenuOptions[i].type, name: mainMenuOptions[i].name, subMenuIndex: this.subMenuIndex, subMenuTop: this.subMenuTop });
        this.subMenuTop += 26;
      }

      // Option
      if (mainMenuOptions[i].type == "option") {
        this.subMenuTop += 26;
        this.menus[0].options.push({ type: mainMenuOptions[i].type, name: mainMenuOptions[i].name, shortcutKeys: mainMenuOptions[i].shortcutKeys });
      }
    }
    // Create all the sub menus (if any)
    this.buildSubMenus(mainMenuOptions);
  }



  buildSubMenus(currentMenu) {
    this.subMenuTop = 0;

    // Start by looping through the all the contents of the current menu
    for (let i in currentMenu) {

      // If we come across an option that is labeled as a sub menu
      if (currentMenu[i].type == "sub menu") {

        // Build that sub menu
        this.menus.push({
          left: this.menuLeft,
          top: this.menus[this.parentIndex].top + this.menus[this.parentIndex].options[   this.menus[this.parentIndex].options.map(e => e.subMenuIndex).indexOf(this.menus.length)   ].subMenuTop,
          width: currentMenu[i].width,
          options: []
        });

        // then create the contents of that sub menu
        for (let j in currentMenu[i].options) {

          // Divider
          if (currentMenu[i].options[j].type == "divider") {
            this.subMenuTop += 12;
            this.menus[this.menus.length - 1].options.push({ type: currentMenu[i].options[j].type });
          }

          // Sub Menu
          if (currentMenu[i].options[j].type == "sub menu") {
            this.menuLeft = (this.menus[this.menus.length-1].left + this.menus[this.menus.length-1].width) - 3;
            this.parentIndex = this.menus.length-1;
            this.subMenuIndex++;
            this.menus[this.menus.length - 1].options.push({ type: currentMenu[i].options[j].type, name: currentMenu[i].options[j].name, subMenuIndex: this.subMenuIndex, subMenuTop: this.subMenuTop });
            this.subMenuTop += 26;
          }

          // Option
          if (currentMenu[i].options[j].type == "option") {
            this.subMenuTop += 26;
            this.menus[this.menus.length - 1].options.push({ type: currentMenu[i].options[j].type, name: currentMenu[i].options[j].name, shortcutKeys: currentMenu[i].options[j].shortcutKeys });
          }
        }
        this.buildSubMenus(currentMenu[i].options)
      }
    }
  }


  onSubMenuOptionOver(subMenuIndex: number) {
    this.subMenuOptionOverTimeout[subMenuIndex] = window.setTimeout(() => {
      this.showMenu[subMenuIndex] = true;
    }, 300)
  }

  onSubMenuOptionOut(subMenuIndex: number) {
    clearTimeout(this.subMenuOptionOverTimeout[subMenuIndex]);

    this.subMenuOptionOutTimeout[subMenuIndex] = window.setTimeout(() => {
      this.showMenu[subMenuIndex] = false;
    }, 250)
  }

  onSubMenuOver(subMenuIndex: number) {
    clearTimeout(this.subMenuOptionOutTimeout[subMenuIndex]);
  }
}


