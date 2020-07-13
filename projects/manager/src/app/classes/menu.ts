import { MenuOptions } from './menu-options';
import { MenuOptionType } from './menu-option-type';
import { MainMenu } from './main-menu';

export class Menu {
    public left: number;
    public top: number;
    public width: number;
    public options: Array<MenuOptions> = [];
    public subMenuOptionOutTimeout?: number;
    public hasFocus: boolean;


    // -----------------------------( CONSTRUCTOR )------------------------------ \\
    constructor(public index: number, public type: MenuType, left?: number, top?: number, isVisible?: boolean) {
        this.left = left;
        this.top = top;
        this.isVisible = isVisible;
    }


    // -----------------------------( ON SHOW )------------------------------ \\
    onShow(htmlMenu: HTMLElement, mainMenu: MainMenu) {
        // Set the focus to any menu that becomes visible
        htmlMenu.focus();

        // When the main menu becomes visible
        if (this.type == MenuType.MainMenu) {

            // Wait, so we can see if the main menu was launched from a mouse down or a mouse up
            window.setTimeout(() => {

                // If the main menu already lost its focus, then that means that the main menu was launched from a mouse down
                if (document.activeElement != htmlMenu) {

                    // If the left or top positions of the main menu differs from the recorded left or top positions or a router option was selected
                    if (this.left != mainMenu.previousLeft || this.top != mainMenu.previousTop) {
                        // Then that means the mouse down is launching a different main menu instead of toggling the same main menu on and off or we're on a different page
                        mainMenu.toggleOn = false;
                    }

                    // If the main menu is currently toggled off
                    if (!mainMenu.toggleOn) {
                        // Then toggle the main menu on
                        mainMenu.toggleOn = true;
                        // Set the focus to the main menu
                        htmlMenu.focus();

                        // But if the main menu is currently toggled on
                    } else {

                        // Close the main menu
                        mainMenu.toggleOn = false;
                        mainMenu.isVisible = false;
                    }
                    // Record the left and top positon of the main menu
                    mainMenu.previousLeft = this.left;
                    mainMenu.previousTop = this.top;

                    // If the main menu never lost its focus, then that means that the main menu was launched from a mouse up
                } else {
                    // Set the main menu toggle to off
                    mainMenu.toggleOn = false;
                }

                // Mark that the initial focus to the main menu has been set
                mainMenu.allowHide = true;
            }, 20)
        }
    }


    // -----------------------------( SET WIDTH )------------------------------ \\
    setWidth(htmlMenu: HTMLElement) {
        let extendedWidth = 0;

        // If the initial width of the menu has NOT been recorded yet
        if (this.width == null) {
            // Record the width of the menu before any width alterations
            this.width = htmlMenu.getBoundingClientRect().width;
        }

        // Then loop through all the options of that menu
        this.options.forEach((option: MenuOptions) => {
            // If any of the options of this menu is either a sub menu or is an option that has a shortcut key
            if (option.type == MenuOptionType.SubMenuOption || option.shortcutKeys != null) {
                // Then extend the width of the menu so that there is a good amount of space between the option name and either the shortcut key or the sub menu arrow
                extendedWidth = 80;
            }
        })

        // Set the width of the menu accordingly
        htmlMenu.style.width = "100%";
        htmlMenu.style.minWidth = (this.width + 7) + "px";
        htmlMenu.style.maxWidth = (this.width + extendedWidth) + "px";


        // Set menu left
        this.setMenuLeft(htmlMenu);
        // Set menu Top
        this.setMenuTop(htmlMenu);
    }


    // -----------------------------( SET MENU LEFT )------------------------------ \\
    setMenuLeft(htmlMenu: HTMLElement) {
        // If it's the main menu
        if (this.type == MenuType.MainMenu) {
            let menuLeft = this.left;
            let menuRight = menuLeft + htmlMenu.getBoundingClientRect().width;
            let menuOffset = menuRight - window.innerWidth;

            // If the main menu extends beyond the left side of the screen
            if (menuLeft < 0) {
                // Re-adjust the position of the main menu so that the left side of the menu is placed at the left side of the screen
                htmlMenu.style.left = 0 + "px";


                // If the main menu extends beyond the right side of the screen
            } else if (menuRight > window.innerWidth) {
                // Re-adjust the position of the main menu so that the right side of the menu is placed at the right side of the screen
                htmlMenu.style.left = (menuLeft - menuOffset) + "px";


                // If the main menu does NOT extend beyond either side of the screen
            } else {
                // Place the main menu as intended
                htmlMenu.style.left = menuLeft + "px";
            }


            // If it's a sub menu
        } else {
            let subMenuLeft = htmlMenu.previousElementSibling.getBoundingClientRect().left + htmlMenu.previousElementSibling.getBoundingClientRect().width - 3;
            let subMenuRight = subMenuLeft + htmlMenu.getBoundingClientRect().width;


            // If the sub menu extends beyond the right side of the screen
            if (subMenuRight > window.innerWidth) {

                // Now, if we were to re-adjust the position of the sub menu so that it was placed to the left of the main menu instead of the right,
                // would that then make the sub menu extend beyond the left side of the screen? If so...
                if ((htmlMenu.previousElementSibling.getBoundingClientRect().left - htmlMenu.getBoundingClientRect().width + 3) < 0) {
                    // Re-adjust the position of the sub menu again so that the left side of the menu is placed at the left side of the screen
                    htmlMenu.style.left = 0 + "px";


                    // If placing the sub menu to the left of the main menu instead of the right does not extend the sub menu beyond the left side of the screen
                } else {
                    // Then go ahead and place the sub menu to the left of the main menu
                    htmlMenu.style.left = (htmlMenu.previousElementSibling.getBoundingClientRect().left - htmlMenu.getBoundingClientRect().width + 3) + "px";
                }


                // If the sub menu does NOT extend beyond the right side of the screen
            } else {
                // Place the sub menu as intended
                htmlMenu.style.left = subMenuLeft + "px";
            }
        }
    }


    // -----------------------------( SET MENU TOP )------------------------------ \\
    setMenuTop(htmlMenu: HTMLElement) {
        // If it's the main menu
        if (this.type == MenuType.MainMenu) {
            let menuTop = this.top;
            let menuBottom = menuTop + htmlMenu.getBoundingClientRect().height;
            let menuOffset = menuBottom - window.innerHeight;

            // If the menu extends beyond the top of the screen
            if (menuTop < 0) {
                // Re-adjust the position of the menu so that the top of the menu is placed at the top of the screen
                htmlMenu.style.top = 0 + "px";

                // If the menu extends beyond the bottom of the screen
            } else if (menuBottom > window.innerHeight) {

                // Re-adjust the position of the menu so that the bottom of the menu is placed at the bottom of the screen
                htmlMenu.style.top = (menuTop - menuOffset) + "px";

                // If the menu does NOT extend beyond the top of the screen
            } else {
                // Place the menu as intended
                htmlMenu.style.top = menuTop + "px";
            }


            // If it's a sub menu
        } else {
            let menuTop = this.top;
            let menuBottom = menuTop + htmlMenu.getBoundingClientRect().height;
            let menuOffset = menuBottom - window.innerHeight;


            // If the menu extends beyond the bottom of the screen
            if (menuBottom > window.innerHeight) {
                // Re-adjust the position of the menu so that the bottom of the menu is placed at the bottom of the screen
                htmlMenu.style.top = (menuTop - menuOffset) + "px";


                // If the menu does NOT extend beyond the bottom of the screen
            } else {
                // Place the menu as intended
                htmlMenu.style.top = menuTop + "px";
            }
        }
    }


    // -----------------------------( ON FOCUS )------------------------------ \\
    onFocus(menus: Array<Menu>) {

        // If the focus is NOT on the main menu
        if (this.type != MenuType.MainMenu) {

            // Let it be known that the main menu does NOT have the focus
            menus[0].hasFocus = false;

            // But if the focus is set to the main menu
        } else {

            // Let it be known that the main menu has the focus
            this.hasFocus = true;
        }
    }


    // -----------------------------( ON BLUR )------------------------------ \\
    onBlur(htmlMenu: HTMLElement, mainMenu: MainMenu) {
        // As long as the initial focus to the main menu has been set
        if (mainMenu.allowHide) {

            // When the main menu loses focus
            if (this.type == MenuType.MainMenu) {

                // Yield for one frame so we can wait and see if a another menu has the focus
                window.setTimeout(() => {
                    // If the main menu lost its focus because of the focus being set to a sub menu
                    if (!this.hasFocus) {

                        // Restore the focus back to the main menu
                        htmlMenu.focus();

                        // If NO menu has the focus
                    } else {

                        // Set the main menu toggle to off
                        mainMenu.toggleOn = false;
                        mainMenu.isVisible = false;
                    }
                });
            }
        }
    }


    // -----------------------------( ON OVER )------------------------------ \\
    onOver() {
        // Now that we have moused over a menu, remove the timer that was waiting to hide the sub menus from a sub menu option out
        clearTimeout(this.subMenuOptionOutTimeout);
    }


    // -----------------------------( IS VISIBLE )------------------------------ \\
    private _isVisible: boolean;
    public get isVisible(): boolean {
        return this._isVisible;
    }
    public set isVisible(value: boolean) {
        if (!value) {
            this.options.forEach(option => {

                if (option.type == MenuOptionType.SubMenuOption) {
                    option.showHighlight = false;
                }
            })
        }
        this._isVisible = value;
    }
}

export enum MenuType {
    MainMenu,
    SubMenuOption
}