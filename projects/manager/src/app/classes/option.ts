import { MenuOptionType } from './menu-option-type';
import { MenuOptions } from './menu-options';
import { Menu } from './menu';

export abstract class Option implements MenuOptions {
    public type: MenuOptionType
    constructor(public name: string, public isDisabled: boolean, public shortcutKeys?: string) { }


    // -----------------------------( CREATE OPTION )------------------------------ \\
    abstract createOption(options: Array<MenuOptions>, menus: Array<Menu>): void;


    // -----------------------------( ON OVER )------------------------------ \\
    onOver(currentMenu: Menu, menus: Array<Menu>) {
        // As long as this menu option is NOT disabled
        if (!this.isDisabled) {

            // Loop through all the menus starting with the menu that's after the one we are on
            menus.forEach((menu: Menu, index) => {
                // Hide each menu
                if (index > currentMenu.index) menu.isVisible = false;
            });

            // Loop through all the options of the current menu we are on
            currentMenu.options.forEach((option: MenuOptions) => {
                // And if any option is type sub menu, then turn off its sub menu option highlight 
                if (option.type == MenuOptionType.SubMenuOption) option.showHighlight = false;
            })
        }
    }
}