import { Option } from './option';
import { MenuOptions } from './menu-options';
import { MenuOptionType } from './menu-option-type';
import { Menu } from './menu';
import { MainMenu } from './main-menu';

export class RouterOption extends Option implements MenuOptions {
    public type: MenuOptionType = MenuOptionType.RouterOption;

    constructor(name: string, isDisabled: boolean, public path: string, shortcutKeys?: string) {
        super(name, isDisabled, shortcutKeys)
    }


    // -----------------------------( CREATE OPTION )------------------------------ \\
    createOption(options: Array<MenuOptions>) {
        options.push(new RouterOption(this.name, this.isDisabled, this.path, this.shortcutKeys));
    }


    // -----------------------------( ON DOWN )------------------------------ \\
    onDown(mainMenu: MainMenu) {
        mainMenu.previousTop = null;
        mainMenu.previousLeft = null;
        mainMenu.menus[0].hasFocus = false;
    }


    // -----------------------------( ON CLICK )------------------------------ \\
    onClick(mainMenu: MainMenu) {
        // As long as this router option is NOT disabled
        if (!this.isDisabled) {
            // Close the main menu
            mainMenu.isVisible = false;
        }
    }
}