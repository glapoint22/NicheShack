import { Injectable } from '@angular/core';
import { Menu } from '../classes/menu';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  // Private
  private currentObj: object;
  private menuTop: number[];
  private subMenuTop: number;
  private parentIndex: number;
  private subMenuIndex: number;
  private mainMenuLeft: number;
  private previousMainMenuTop: number;
  private previousMainMenuLeft: number;
  private toggleMainMenuOn: boolean;
  private routerOptionDown: boolean;
  private mainMenuHasFocus: boolean;
  private initialMenuWidth: number[];
  private allowMenuHide: boolean;
  private subMenuOptionOutTimeout: number[];
  private subMenuOptionOverTimeout: number[];

  // Public
  public menus: Menu[];
  // public showMenu: boolean;
  public showMenus: boolean[];
  public subMenuOptionHighlightOn: boolean[];
  public onMenuHide = new Subject<void>();


  private _showMenu: boolean;
  public get showMenu(): boolean {
    return this._showMenu;
  }
  public set showMenu(value: boolean) {
    // Loop through all the menus
    for (let i = 0; i < this.menus.length; i++) {
      // And hide each one
      this.showMenus[i] = false;
    }
    if (!value) this.onMenuHide.next();
    this._showMenu = value;
  }








  // -----------------------------( BUILD MENU )------------------------------ \\
  buildMenu(currentObj: object, left: number, top: number, ...mainMenuOptions: any) {
    this.menus = [];
    this.menuTop = [];
    this.showMenus = [];
    this.subMenuTop = 0;
    this.showMenu = true;
    this.menuTop[0] = top;
    this.subMenuIndex = 0;
    this.currentObj = currentObj;
    this.showMenus[0] = true;
    this.mainMenuLeft = left;
    this.initialMenuWidth = [];
    this.subMenuOptionOutTimeout = [];
    this.subMenuOptionHighlightOn = [];
    this.subMenuOptionOverTimeout = [];
    this.allowMenuHide = false;


    // Create the main menu
    this.menus.push({ options: [] });

    // Then create the contents of the main menu
    for (let i in mainMenuOptions) {

      // Divider
      if (mainMenuOptions[i].type == "divider") {
        this.subMenuTop += 12;
        this.menus[0].options.push({
          type: mainMenuOptions[i].type
        });
      }

      // Sub Menu
      if (mainMenuOptions[i].type == "sub menu") {
        this.parentIndex = 0;
        this.subMenuIndex++;
        this.menus[0].options.push({
          type: mainMenuOptions[i].type,
          name: mainMenuOptions[i].name,
          subMenuIndex: this.subMenuIndex,
          subMenuTop: this.subMenuTop,
          isDisabled: mainMenuOptions[i].isDisabled
        });
        this.subMenuTop += 26;
      }

      // Option
      if (mainMenuOptions[i].type == "option") {
        this.subMenuTop += 26;
        this.menus[0].options.push({
          type: mainMenuOptions[i].type,
          name: mainMenuOptions[i].name,
          shortcutKeys: mainMenuOptions[i].shortcutKeys,
          isDisabled: mainMenuOptions[i].isDisabled,
          menuOptionFunction: mainMenuOptions[i].menuOptionFunction,
          functionParameters: mainMenuOptions[i].functionParameters
        });
      }

      // Router Option
      if (mainMenuOptions[i].type == "router option") {
        this.subMenuTop += 26;
        this.menus[0].options.push({
          type: mainMenuOptions[i].type,
          name: mainMenuOptions[i].name,
          shortcutKeys: mainMenuOptions[i].shortcutKeys,
          isDisabled: mainMenuOptions[i].isDisabled,
          path: mainMenuOptions[i].path
        });
      }
    }
    // Create the sub menus (if any)
    this.buildSubMenus(mainMenuOptions);
  }


  // -----------------------------( BUILD SUB MENUS )------------------------------ \\
  buildSubMenus(currentMenu) {
    this.subMenuTop = 0;

    // Start by looping through the all the contents of the current menu
    for (let i in currentMenu) {

      // If we come across an option that is labeled as a sub menu
      if (currentMenu[i].type == "sub menu") {
        // Get the menu options of the parent of this sub menu
        let parentMenuOptions = this.menus[this.parentIndex].options;
        // Map out a new array from the parent's menu options that displays the values of the subMenuIndex property
        let subMenuIndexArray = parentMenuOptions.map(x => x.subMenuIndex);
        // Find the index within the subMenuIndexArray that has a subMenuIndex value that matches the index of this new sub menu
        let indexOfSubMenuIndex = subMenuIndexArray.indexOf(this.menus.length);
        // Define the top position of where this sub menu will placed in relation to its parent
        this.menuTop[this.menus.length] = this.menus[this.parentIndex].options[indexOfSubMenuIndex].subMenuTop;

        // Build that sub menu
        this.menus.push({ options: [] });

        // Then create the contents of that sub menu
        for (let j in currentMenu[i].options) {

          // Divider
          if (currentMenu[i].options[j].type == "divider") {
            this.subMenuTop += 12;
            this.menus[this.menus.length - 1].options.push({
              type: currentMenu[i].options[j].type
            });
          }

          // Sub Menu
          if (currentMenu[i].options[j].type == "sub menu") {
            this.parentIndex = this.menus.length - 1;
            this.subMenuIndex++;
            this.menus[this.menus.length - 1].options.push({
              type: currentMenu[i].options[j].type,
              name: currentMenu[i].options[j].name,
              subMenuIndex: this.subMenuIndex,
              subMenuTop: this.subMenuTop,
              isDisabled: currentMenu[i].options[j].isDisabled
            });
            this.subMenuTop += 26;
          }

          // Option
          if (currentMenu[i].options[j].type == "option") {
            this.subMenuTop += 26;
            this.menus[this.menus.length - 1].options.push({
              type: currentMenu[i].options[j].type,
              name: currentMenu[i].options[j].name,
              shortcutKeys: currentMenu[i].options[j].shortcutKeys,
              isDisabled: currentMenu[i].options[j].isDisabled,
              menuOptionFunction: currentMenu[i].options[j].menuOptionFunction,
              functionParameters: currentMenu[i].options[j].functionParameters
            });
          }

          // Router Option
          if (currentMenu[i].options[j].type == "router option") {
            this.subMenuTop += 26;
            this.menus[this.menus.length - 1].options.push({
              type: currentMenu[i].options[j].type,
              name: currentMenu[i].options[j].name,
              shortcutKeys: currentMenu[i].options[j].shortcutKeys,
              isDisabled: currentMenu[i].options[j].isDisabled,
              path: currentMenu[i].options[j].path
            });
          }
        }
        this.buildSubMenus(currentMenu[i].options)
      }
    }
  }


  // -----------------------------( ON MENU SHOW )------------------------------ \\
  onMenuShow(menuIndex: number, menu: HTMLElement) {
    // Set the focus to any menu that becomes visible
    menu.focus();

    // When the main menu becomes visible
    if (menuIndex == 0) {

      // Wait, so we can see if the main menu was launched from a mouse down or a mouse up
      window.setTimeout(() => {

        // If the main menu already lost its focus, then that means that the main menu was launched from a mouse down
        if (document.activeElement != menu) {

          // If the left or top positions of the main menu differs from the recorded left or top positions or a router option was selected
          if ((this.mainMenuLeft != this.previousMainMenuLeft || this.menuTop[menuIndex] != this.previousMainMenuTop) || this.routerOptionDown) {

            // Then that means the mouse down is launching a different main menu instead of toggling the same main menu on and off or we're on a different page
            this.toggleMainMenuOn = false;
          }


          // If the main menu is currently toggled off
          if (!this.toggleMainMenuOn) {
            // Then toggle the main menu on
            this.toggleMainMenuOn = true;
            // Set the focus to the main menu
            menu.focus();

            // But if the main menu is currently toggled on
          } else {

            // Toggle the main menu off
            this.toggleMainMenuOn = false;
            this.showMenu = false;
          }
          // Record the left and top positon of the main menu
          this.previousMainMenuLeft = this.mainMenuLeft;
          this.previousMainMenuTop = this.menuTop[menuIndex];


          // If the main menu never lost its focus, then that means that the main menu was launched from a mouse up
        } else {
          // Set the main menu toggle to off
          this.toggleMainMenuOn = false;
        }

        // If the initial focus to the main menu has NOT been set yet
        if (!this.allowMenuHide) this.routerOptionDown = false;

        // Mark that the initial focus to the main menu has been set
        this.allowMenuHide = true;
      }, 20)
    }
  }


  // -----------------------------( SET MENU WIDTH )------------------------------ \\
  setMenuWidth(menuIndex: number, menu: HTMLElement) {
    let extendedWidth = 0;

    // If the initial width of the menu has NOT been recorded yet
    if (this.initialMenuWidth[menuIndex] == null) {
      // Record the width of the menu before any width alterations
      this.initialMenuWidth[menuIndex] = menu.getBoundingClientRect().width;
    }

    // Then loop through all the options of that menu
    for (let i = 0; i < this.menus[menuIndex].options.length; i++) {
      // If any of the options of this menu is either a sub menu or is an option that has a shortcut key
      if (this.menus[menuIndex].options[i].type == "sub menu" || this.menus[menuIndex].options[i].shortcutKeys != null) {
        // Then extend the width of the menu so that there is a good amount of space between the option name and either the shortcut key or the sub menu arrow
        extendedWidth = 80;
        break;
      }
    }

    // Set the width of the menu accordingly
    menu.style.width = "100%";
    menu.style.minWidth = (this.initialMenuWidth[menuIndex] + 7) + "px";
    menu.style.maxWidth = (this.initialMenuWidth[menuIndex] + extendedWidth) + "px";


    // Set menu left
    this.setMenuLeft(menuIndex, menu);
    // Set menu Top
    this.setMenuTop(menuIndex, menu);
  }


  // -----------------------------( SET MENU LEFT )------------------------------ \\
  setMenuLeft(menuIndex: number, menu: HTMLElement) {
    // If it's the main menu
    if (menuIndex == 0) {
      let menuLeft = this.mainMenuLeft;
      let menuRight = this.mainMenuLeft + menu.getBoundingClientRect().width;
      let menuOffset = menuRight - window.innerWidth;

      // If the main menu extends beyond the left side of the screen
      if (menuLeft < 0) {
        // Re-adjust the position of the main menu so that the left side of the menu is placed at the left side of the screen
        menu.style.left = 0 + "px";


        // If the main menu extends beyond the right side of the screen
      } else if (menuRight > window.innerWidth) {
        // Re-adjust the position of the main menu so that the right side of the menu is placed at the right side of the screen
        menu.style.left = (menuLeft - menuOffset) + "px";


        // If the main menu does NOT extend beyond either side of the screen
      } else {
        // Place the main menu as intended
        menu.style.left = menuLeft + "px";
      }


      // If it's a sub menu
    } else {
      let subMenuLeft = menu.previousElementSibling.getBoundingClientRect().left + menu.previousElementSibling.getBoundingClientRect().width - 3;
      let subMenuRight = subMenuLeft + menu.getBoundingClientRect().width;


      // If the sub menu extends beyond the right side of the screen
      if (subMenuRight > window.innerWidth) {

        // Now, if we were to re-adjust the position of the sub menu so that it was placed to the left of the main menu instead of the right,
        // would that then make the sub menu extend beyond the left side of the screen? If so...
        if ((menu.previousElementSibling.getBoundingClientRect().left - menu.getBoundingClientRect().width + 3) < 0) {
          // Re-adjust the position of the sub menu again so that the left side of the menu is placed at the left side of the screen
          menu.style.left = 0 + "px";


          // If placing the sub menu to the left of the main menu instead of the right does not extend the sub menu beyond the left side of the screen
        } else {
          // Then go ahead and place the sub menu to the left of the main menu
          menu.style.left = (menu.previousElementSibling.getBoundingClientRect().left - menu.getBoundingClientRect().width + 3) + "px";
        }


        // If the sub menu does NOT extend beyond the right side of the screen
      } else {
        // Place the sub menu as intended
        menu.style.left = subMenuLeft + "px";
      }
    }
  }


  // -----------------------------( SET MENU TOP )------------------------------ \\
  setMenuTop(menuIndex: number, menu: HTMLElement) {
    // If it's the main menu
    if (menuIndex == 0) {
      let menuTop = this.menuTop[menuIndex];

      // If the menu extends beyond the top of the screen
      if (menuTop < 0) {
        // Re-adjust the position of the menu so that the top of the menu is placed at the top of the screen
        menu.style.top = 0 + "px";

        // If the menu does NOT extend beyond the top of the screen
      } else {
        // Place the menu as intended
        menu.style.top = menuTop + "px";
      }


      // If it's a sub menu
    } else {
      let menuTop = this.menuTop[menuIndex] + menu.previousElementSibling.getBoundingClientRect().top;
      let menuBottom = menuTop + menu.getBoundingClientRect().height;
      let menuOffset = menuBottom - window.innerHeight;


      // If the menu extends beyond the bottom of the screen
      if (menuBottom > window.innerHeight) {
        // Re-adjust the position of the menu so that the bottom of the menu is placed at the bottom of the screen
        menu.style.top = (menuTop - menuOffset) + "px";


        // If the menu does NOT extend beyond the bottom of the screen
      } else {
        // Place the menu as intended
        menu.style.top = menuTop + "px";
      }
    }
  }


  // -----------------------------( ON MENU FOCUS )------------------------------ \\
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


  // -----------------------------( ON MENU BLUR )------------------------------ \\
  onMenuBlur(menuIndex: number, menu: HTMLElement) {

    // As long as the initial focus to the main menu has been set
    if (this.allowMenuHide) {

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

            // Set the main menu toggle to off
            this.toggleMainMenuOn = false;
            this.showMenu = false;
          }
        });
      }
    }
  }


  // -----------------------------( ON MENU OVER )------------------------------ \\
  onMenuOver(menuIndex: number) {
    // Now that we have moused over a menu, remove the timer that was waiting to hide the sub menus from a sub menu option out
    clearTimeout(this.subMenuOptionOutTimeout[menuIndex]);
  }


  // -----------------------------( ON MENU OPTION OVER )------------------------------ \\
  onMenuOptionOver(menuIndex: number, optionIndex: number) {
    // As long as this menu option is NOT disabled
    if (!this.menus[menuIndex].options[optionIndex].isDisabled) {
      // Loop through all the menus starting with the menu that's after the one we are on
      for (let i = menuIndex + 1; i < this.menus.length; i++) {
        // Hide each menu
        this.showMenus[i] = false;
        // Turn off each sub menu option highlight
        this.subMenuOptionHighlightOn[i] = false;
      }
    }
  }


  // -----------------------------( ON MENU OPTION CLICK )------------------------------ \\
  onMenuOptionClick(menuIndex: number, optionIndex: number) {
    // As long as this menu option is NOT disabled
    if (!this.menus[menuIndex].options[optionIndex].isDisabled) {
      // Call the function that is associated with this menu option
      this.menus[menuIndex].options[optionIndex].menuOptionFunction.apply(this.currentObj, this.menus[menuIndex].options[optionIndex].functionParameters)
      this.showMenu = false;
    }
  }


  // -----------------------------( ON ROUTER OPTION CLICK )------------------------------ \\
  onRouterOptionClick(menuIndex: number, optionIndex: number) {
    // As long as this menu option is NOT disabled
    if (!this.menus[menuIndex].options[optionIndex].isDisabled) {
      this.showMenu = false;
    }
  }


  // -----------------------------( ON MENU ROUTER OPTION DOWN )------------------------------ \\
  onMenuRouterOptionDown() {
    this.mainMenuHasFocus = false;
    this.routerOptionDown = true;
  }


  // -----------------------------( ON SUB MENU OPTION OVER )------------------------------ \\
  onSubMenuOptionOver(menuIndex: number, optionIndex: number) {
    // As long as this sub menu option is NOT disabled
    if (!this.menus[menuIndex].options[optionIndex].isDisabled) {
      let subMenuIndex = this.menus[menuIndex].options[optionIndex].subMenuIndex

      // First, hide any sub menus that don't belong to the sub menu option we just hovered over
      this.hideSubMenus(menuIndex, subMenuIndex)

      // Wait, so we can see if we intend on opening the sub menu or just passing by
      this.subMenuOptionOverTimeout[subMenuIndex] = window.setTimeout(() => {
        // If we wait long enough, show the sub menu
        this.showMenus[subMenuIndex] = true;
        // Turn on the sub menu option highlight
        this.subMenuOptionHighlightOn[subMenuIndex] = true;
      }, 300)
    }
  }


  // -----------------------------( ON SUB MENU OPTION OUT )------------------------------ \\
  onSubMenuOptionOut(menuIndex: number, optionIndex: number) {
    // As long as this sub menu option is NOT disabled
    if (!this.menus[menuIndex].options[optionIndex].isDisabled) {
      let subMenuIndex = this.menus[menuIndex].options[optionIndex].subMenuIndex

      // Now that we have left the sub menu option, remove the timer that was waiting to show its sub menu from a sub menu option over
      clearTimeout(this.subMenuOptionOverTimeout[subMenuIndex]);

      // Wait, so we can see if we're leaving this sub menu option to go to a sub menu.
      this.subMenuOptionOutTimeout[subMenuIndex] = window.setTimeout(() => {
        // If we wait long enough, and we don't go on a sub menu, then loop through all the menus starting with the the sub menu of the menu we are on
        for (let i = subMenuIndex; i < this.menus.length; i++) {
          // And hide each menu from that point
          this.showMenus[i] = false;
          // Turn off the sub menu option highlight
          this.subMenuOptionHighlightOn[subMenuIndex] = false;
        }
      }, 250)
    }
  }


  // -----------------------------( HIDE SUB MENUS )------------------------------ \\
  hideSubMenus(menuIndex: number, subMenuIndex: number) {
    // Loop through all the menu options of the current menu
    for (let i = 0; i < this.menus[menuIndex].options.length; i++) {
      // If we come across a menu option where its type is a sub menu
      if (this.menus[menuIndex].options[i].type == "sub menu") {
        // And the sub menu index is NOT the same index as the sub menu option we're hovering over
        if (this.menus[menuIndex].options[i].subMenuIndex != subMenuIndex) {
          // Then hide that menu
          this.showMenus[this.menus[menuIndex].options[i].subMenuIndex] = false;
          // Turn off its sub menu option highlight
          this.subMenuOptionHighlightOn[this.menus[menuIndex].options[i].subMenuIndex] = false;
          // Now, take the menu we just hid, and loop through its menu options to see if there is a sub menu on it we need to hide
          this.hideSubMenus(this.menus[menuIndex].options[i].subMenuIndex, subMenuIndex)
        }
      }
    }
  }


  // -----------------------------( OPTION )------------------------------ \\
  option(name: string, shortcutKeys: string, isDisabled: boolean, menuOptionFunction: Function, ...functionParameters: any) {
    return { type: "option", name: name, shortcutKeys: shortcutKeys, isDisabled: isDisabled, menuOptionFunction: menuOptionFunction, functionParameters: functionParameters }
  }


  // -----------------------------( ROUTER OPTION )------------------------------ \\
  routerOption(name: string, shortcutKeys: string, isDisabled: boolean, path: string) {
    return { type: "router option", name: name, shortcutKeys: shortcutKeys, isDisabled: isDisabled, path: path }
  }


  // -----------------------------( SUB MENU )------------------------------ \\
  subMenu(name: string, isDisabled: boolean, ...options: any) {
    return { type: "sub menu", name: name, isDisabled: isDisabled, options: options }
  }


  // -----------------------------( DIVIDER )------------------------------ \\
  divider() {
    return { type: "divider" }
  }
}