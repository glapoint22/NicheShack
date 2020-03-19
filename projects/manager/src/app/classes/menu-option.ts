export class MenuOption {
    type: string;
    name?: string;
    subMenuIndex?: number;
    subMenuTop?: number;
    shortcutKeys?: string;
    isDisabled?: boolean;
    menuOptionFunction?: Function;
    functionParameters?: any;
    path?: string;
}