import { Option } from './option';
import { MenuOptions } from './menu-options';
import { MenuOptionType } from './menu-option-type';
import { Menu, MenuType } from './menu';

export class SubMenuOption extends Option implements MenuOptions {
    public subMenuIndex: number;
    public subMenuOptionOverTimeout: number;
    public type: MenuOptionType = MenuOptionType.SubMenuOption;
    public showHighlight: boolean;

    constructor(name: string, isDisabled: boolean, public options: Array<MenuOptions>, shortcutKeys?: string) {
        super(name, isDisabled, shortcutKeys)
    }


    // -----------------------------( CREATE OPTION )------------------------------ \\
    createOption(options: Array<MenuOptions>, menus: Array<Menu>) {

        menus.push(new Menu(menus.length, MenuType.SubMenuOption));

        let subMenu = new SubMenuOption(this.name, this.isDisabled, menus[menus.length - 1].options);
        subMenu.subMenuIndex = menus.length - 1;
        options.push(subMenu);



        this.options.forEach((subMenuOption: MenuOptions) => {
            subMenuOption.createOption(menus[menus.length - 1].options, menus);
        });
    }


    // -----------------------------( ON SUB MENU OPTION OVER )------------------------------ \\
    onSubMenuOptionOver(htmlMenu: HTMLElement, menu: Menu, menus: Array<Menu>) {

        // As long as this sub menu option is NOT disabled
        if (!this.isDisabled) {


            // this.menuTop[menuOption.subMenuIndex] = htmlMenu.getBoundingClientRect().top;

            menus.find((menu, index) => {
                if (index == this.subMenuIndex) menu.top = htmlMenu.getBoundingClientRect().top;
            });



            // First, hide any sub menus that don't belong to the sub menu option we just hovered over
            this.hideSubMenus(menu, this.subMenuIndex, menus)

            // Wait, so we can see if we intend on opening the sub menu or just passing by
            this.subMenuOptionOverTimeout = window.setTimeout(() => {

                menus.find((menu, index) => {
                    if (index == this.subMenuIndex) menu.isVisible = true;
                });


                this.showHighlight = true;
            }, 300)
        }
    }


    // -----------------------------( ON SUB MENU OPTION OUT )------------------------------ \\
  onSubMenuOptionOut(menus: Array<Menu>) {
    // As long as this sub menu option is NOT disabled
    if (!this.isDisabled) {

      // Now that we have left the sub menu option, remove the timer that was waiting to show its sub menu from a sub menu option over
      clearTimeout(this.subMenuOptionOverTimeout);


      // Wait, so we can see if we're leaving this sub menu option to go to a sub menu.
      menus[this.subMenuIndex].subMenuOptionOutTimeout = window.setTimeout(() => {
        // If we wait long enough, and we don't go on a sub menu, then loop through all the menus starting with the the sub menu of the menu we are on


        menus.forEach((menu, index) => {
          if (index >= this.subMenuIndex) menu.isVisible = false;
        });

        this.showHighlight = false;

        // for (let i = menuOption.subMenuIndex; i < this.menus.length; i++) {
        //   // And hide each menu from that point
        //   // this.menus[i].visible = false;
        //   // Turn off the sub menu option highlight
        //   this.subMenuOptionHighlightOn[menuOption.subMenuIndex] = false;
        // }
      }, 250)
    }
  }


    // -----------------------------( HIDE SUB MENUS )------------------------------ \\
    hideSubMenus(menu: Menu, subMenuIndex, menus: Array<Menu>) {

        menu.options.forEach((option: MenuOptions) => {
            let currentMenu: Menu;

            // If we come across a menu option where its type is a sub menu
            if (option.type == MenuOptionType.SubMenuOption) {





                // And the sub menu index is NOT the same index as the sub menu option we're hovering over
                if ((option.subMenuIndex) != subMenuIndex) {

                    option.showHighlight = false;


                    menus.find((menu, index) => {
                        if (index == option.subMenuIndex) currentMenu = menu;
                    });

                    currentMenu.isVisible = false;



                    // Then hide that menu
                    // this.menus[options.subMenuIndex].visible = false;
                    // Turn off its sub menu option highlight
                    // this.subMenuOptionHighlightOn[option.subMenuIndex] = false;
                    // Now, take the menu we just hid, and loop through its menu options to see if there is a sub menu on it we need to hide
                    this.hideSubMenus(currentMenu, subMenuIndex, menus)
                }
            }
        });
    }
}