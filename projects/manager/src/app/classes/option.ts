import { MenuOptionType } from './menu-option-type';
import { MenuOptions } from './menu-options';
import { Menu } from './menu';

export abstract class Option implements MenuOptions {
    public type: MenuOptionType
    constructor(public name: string, public isDisabled: boolean, public shortcutKeys?: string) { }


    // -----------------------------( CREATE OPTION )------------------------------ \\
    abstract createOption(options: Array<MenuOptions>, menus: Array<Menu>): void;


    // -----------------------------( ON MENU OPTION OVER )------------------------------ \\
    onMenuOptionOver(currentMenu: Menu, menus: Array<Menu>) {
        // As long as this menu option is NOT disabled
        if (!this.isDisabled) {

            menus.forEach((menu: Menu, index) => {
                if (index > currentMenu.index) menu.isVisible = false;

            });

            currentMenu.options.forEach((option: MenuOptions) => {
                if (option.type == MenuOptionType.SubMenuOption) option.showHighlight = false;
            })
        }
    }
}