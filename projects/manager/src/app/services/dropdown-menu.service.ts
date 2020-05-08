import { Injectable } from '@angular/core';
import { KeyValue } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DropdownMenuService {
  // Private
  private menuTop: number;
  private menuLeft: number;
  private allowMenuHide: boolean;
  private previousMenuTop: number;
  private previousMenuLeft: number;
  private arrowKeyDownFunction: Function;
  private menuOptionSelectFunction: Function;
  private restoreSelectedIndexValueFunction: Function;

  // Public
  public showMenu: boolean;
  public menuWidth: number;
  public currentObj: object;
  public isEditable: boolean;
  public selectedIndex: number;
  public menuOptions: KeyValue<string, string>[];


  // -----------------------------( BUILD MENU )------------------------------ \\
  buildMenu(currentObj: object, dropdown, isEditable: boolean, options: KeyValue<string, string>[], menuOptionSelectFunction: Function, arrowKeyDownFunction: Function, restoreSelectedIndexValueFunction: Function) {
    this.menuOptions = options;
    this.allowMenuHide = false;
    this.isEditable = isEditable;
    this.menuWidth = dropdown.offsetWidth;
    this.arrowKeyDownFunction = arrowKeyDownFunction;
    this.menuLeft = dropdown.getBoundingClientRect().left;
    this.menuOptionSelectFunction = menuOptionSelectFunction;
    this.restoreSelectedIndexValueFunction = restoreSelectedIndexValueFunction;
    this.menuTop = dropdown.getBoundingClientRect().top + dropdown.getBoundingClientRect().height - 1;

    // If the left or top positions of the menu differs from the recorded left or top positions, then
    // that means we're selecting a different dropdown instead of toggling the same dropdown on and off
    if (this.menuLeft != this.previousMenuLeft || this.menuTop != this.previousMenuTop) {

      // We may come across a situation where the previous dropdown still has its menu open and its selected 
      // index value is different from its initial selected index value, so here we'll assign its current selected
      // index value back to the recorded initial selected index value just in case
      if (this.currentObj != null) this.restoreSelectedIndexValueFunction.apply(this.currentObj)

      // Reset for the new dropdown
      this.showMenu = false;
    }

    // Update
    this.currentObj = currentObj;
    this.previousMenuTop = this.menuTop;
    this.previousMenuLeft = this.menuLeft;

    // Delay assigning the values
    window.setTimeout(() => {
      // The menu will get hidden as soon as it opens because the mousedown event that initially opens the menu causes
      // the menu to lose focus, which then triggers the blur event to hide the menu. To prevent this, we delay the
      // setting of the allowMenuHide value to true so it dosn't allow the blur event to hide the menu when it first opens
      this.allowMenuHide = true;

      // When the menu is being toggled on, it will lose focus as soon as it opens because the mousedown event that initially opens
      // the menu causes the menu to lose the focus. We delay the assigning of the showMenu value so we can avoid this mouse down problem
      this.showMenu = !this.showMenu;
    })
  }


  // -----------------------------( ON MENU SHOW )------------------------------ \\
  onMenuShow(menu: HTMLElement) {
    // Set the focus to the menu
    menu.focus();
  }


  // -----------------------------( SET MENU POSITION )------------------------------ \\
  setMenuPosition(menu: HTMLElement) {
    let menuLeft = this.menuLeft;
    let menuRight = this.menuLeft + menu.getBoundingClientRect().width;
    let menuOffset = menuRight - window.innerWidth;

    // If the menu extends beyond the left side of the screen
    if (menuLeft < 0) {
      // Re-adjust the position of the menu so that the left side of the menu is placed against the left side of the screen
      menu.style.left = 0 + "px";


      // If the menu extends beyond the right side of the screen
    } else if (menuRight > window.innerWidth) {
      // Re-adjust the position of the menu so that the right side of the menu is placed against the right side of the screen
      menu.style.left = (menuLeft - menuOffset) + "px";


      // If the menu does NOT extend beyond either side of the screen
    } else {
      // Place the menu as intended
      menu.style.left = menuLeft + "px";
    }

    // Set the menu's top position
    menu.style.top = this.menuTop + "px";
  }


  // -----------------------------( ON MENU OPTION SELECT )------------------------------ \\
  onMenuOptionSelect(selectedIndex: number) {

    if (!(selectedIndex == 0 && this.menuOptions[0].key == "Other")) {
      // Hide the menu
      this.showMenu = false;
      // Update the selected index
      this.selectedIndex = selectedIndex;
      // Call the function that gets executed when an menu option is selected
      this.menuOptionSelectFunction.apply(this.currentObj)
    }
  }


  // -----------------------------( ON ARROW KEY DOWN )------------------------------ \\
  onArrowKeyDown(selectedIndex: number) {
    this.selectedIndex = selectedIndex;
    this.arrowKeyDownFunction.apply(this.currentObj)
  }


  // -----------------------------( ON MENU BLUR )------------------------------ \\
  onMenuBlur() {
    // If the menu has not yet been hidden
    if (this.showMenu) {
      // It means a menu option was never selected, so restore the selected index value back to its original value
      this.restoreSelectedIndexValueFunction.apply(this.currentObj)
    }
    
    // The menu will get hidden as soon as it opens because the mousedown event that initially opens the menu 
    // causes the menu to lose focus, which then triggers the blur event to hide the menu. To prevent this, we
    // don't allow the blur event to hide the menu when it first opens
    if (this.allowMenuHide) {
      this.showMenu = false;
    }
  }
}