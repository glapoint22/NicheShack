import { MenuOptions } from './menu-options';
import { MenuOptionType } from './menu-option-type';

export class MenuDivider implements MenuOptions {
    public type: MenuOptionType = MenuOptionType.Divider;


    // -----------------------------( CREATE OPTION )------------------------------ \\
    createOption(options: Array<MenuOptions>) {
        options.push(new MenuDivider());
    }
}