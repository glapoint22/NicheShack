import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor() { }
  public menus: any[];
  public showMenu: boolean[];
  private menuLeft: number;
  private subMenuTop: number;
  private parentIndex: number;
  private subMenuIndex: number;
  private mainMenuHasFocus: boolean;
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
          top: this.menus[this.parentIndex].top + this.menus[this.parentIndex].options[this.menus[this.parentIndex].options.map(e => e.subMenuIndex).indexOf(this.menus.length)].subMenuTop,
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
            this.menuLeft = (this.menus[this.menus.length - 1].left + this.menus[this.menus.length - 1].width) - 3;
            this.parentIndex = this.menus.length - 1;
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


  hideSubMenus(menuIndex: number, subMenuIndex: number) {
    // Loop through all the menu options of the current menu
    for(let i = 0; i < this.menus[menuIndex].options.length; i++) {
      // If we come across a menu option where its type is a sub menu
      if(this.menus[menuIndex].options[i].type == "sub menu") {
        // And the sub menu index is NOT the same index as the sub menu option we're hovering over
        if(this.menus[menuIndex].options[i].subMenuIndex != subMenuIndex) {
          // Then hide that menu
          this.showMenu[this.menus[menuIndex].options[i].subMenuIndex] = false;
          // Now, take the menu we just hid, and loop through its menu options to see if there is a sub menu on it we need to hide
          this.hideSubMenus(this.menus[menuIndex].options[i].subMenuIndex, subMenuIndex)
        }
      }
    }
  }


  onSubMenuOptionOver(menuIndex: number, subMenuIndex: number) {
    // First, hide any sub menus that don't belong to the sub menu option we just hovered over
    this.hideSubMenus(menuIndex, subMenuIndex)

    // Wait, so we can see if we intend on opening the sub menu or just passing by
    this.subMenuOptionOverTimeout[subMenuIndex] = window.setTimeout(() => {
      // If we wait long enough, show the sub menu
      this.showMenu[subMenuIndex] = true;
    }, 300)
  }

  onSubMenuOptionOut(subMenuIndex: number) {
    // Now that we have left the sub menu option, remove the timer that was waiting to show its sub menu from a sub menu option over
    clearTimeout(this.subMenuOptionOverTimeout[subMenuIndex]);

    // Wait, so we can see if we're leaving this sub menu option to go to a sub menu.
    this.subMenuOptionOutTimeout[subMenuIndex] = window.setTimeout(() => {
      // If we wait long enough, and we don't go on a sub menu, then loop through all the menus starting with the the sub menu of the menu we are on
      for (let i = subMenuIndex; i < this.menus.length; i++) {
        // And hide each menu from that point
        this.showMenu[i] = false;
      }
    }, 250)
  }

  onSubMenuOver(subMenuIndex: number) {
    // Now that we have moused over a sub menu, remove the timer that was waiting to hide the sub menus from a sub menu option out
    clearTimeout(this.subMenuOptionOutTimeout[subMenuIndex]);
  }

  onMenuFocus(menuIndex: number) {
    // If the focus is set to a sub menu
    if (menuIndex != 0) {
      // Let it be known that the main menu does NOT have the focus
      this.mainMenuHasFocus = false;

      // But if the focus is set to the main menu
    } else {
      // Let it be known that the main menu has the focus
      this.mainMenuHasFocus = true;
    }
  }

  onMenuBlur(menuIndex: number, menu: HTMLElement) {

    // When the main menu loses focus
    if (menuIndex == 0) {

      // Yield for one frame so we can wait and see if a another menu has the focus
      window.setTimeout(() => {

        // If the main menu lost its focus because of the focus being set to a sub menu
        if (!this.mainMenuHasFocus) {
          // Restore the focus back to the main menu
          menu.focus();

          // If NO menu has the focus
        } else {

          // Loop through all the menus
          for (let i = 0; i < this.menus.length; i++) {
            // And hide each one
            this.showMenu[i] = false;
          }
        }
      });
    }
  }

  removeSubMenus(menuIndex: number) {
    // Loop through all the menus starting with the menu that's after the one we are on
    for (let i = menuIndex + 1; i < this.menus.length; i++) {
      // Hide each menu
      this.showMenu[i] = false;
    }
  }
}