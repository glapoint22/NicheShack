import { MenuOptionType } from './menu-option-type';
import { Menu } from './menu';

export interface MenuOptions {
    type: MenuOptionType;
    showHighlight?: boolean;
    subMenuIndex?: number;
    shortcutKeys?: string;

    // -----------------------------( CREATE OPTION )------------------------------ \\
    createOption(options: Array<MenuOptions>, menus?: Array<Menu>);
}