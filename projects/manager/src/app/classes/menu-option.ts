import { Option } from './option';
import { MenuOptions } from './menu-options';
import { MenuOptionType } from './menu-option-type';
import { Menu } from './menu';
import { MainMenu } from './main-menu';

export class MenuOption extends Option implements MenuOptions {
    public type: MenuOptionType = MenuOptionType.MenuOption;

    constructor(name: string, isDisabled: boolean, public menuOptionFunction: Function, public functionParameters?: any, shortcutKeys?: string) {
        super(name, isDisabled, shortcutKeys)
    }


    // -----------------------------( CREATE OPTION )------------------------------ \\
    createOption(options: Array<MenuOptions>) {
        options.push(new MenuOption(this.name, this.isDisabled, this.menuOptionFunction, this.functionParameters, this.shortcutKeys));
    }


    // -----------------------------( ON CLICK )------------------------------ \\
    onClick(mainMenu: MainMenu) {
        // As long as this menu option is NOT disabled
        if (!this.isDisabled) {
            // Call the function that is associated with this menu option
            this.menuOptionFunction.apply(mainMenu.currentObj, this.functionParameters)
            // Close the main menu
            mainMenu.isVisible = false;
        }
    }
}