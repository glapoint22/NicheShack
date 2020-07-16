import { Menu, MenuType } from './menu';
import { Subject } from 'rxjs';
import { MenuOptions } from './menu-options';

export class MainMenu {
    public toggleOn: boolean;
    public allowHide: boolean;
    public currentObj: object;
    public previousTop: number;
    public previousLeft: number;
    public menus: Array<Menu> = [];
    public onHide = new Subject<void>();


    // -----------------------------( INITIALIZE )------------------------------ \\
    initialize(currentObj: object, left: number, top: number, mainMenuOptions: MenuOptions[]) {
        this.menus = [];
        this.isVisible = true;
        this.allowHide = false;
        this.currentObj = currentObj;

        // Create the main menu
        this.menus.push(new Menu(this.menus.length, MenuType.MainMenu, left, top, true));

        // Create the sub menus(if any)
        mainMenuOptions.forEach((mainMenuOption: MenuOptions) => {
            mainMenuOption.createOption(this.menus[0].options, this.menus);
        });
    }


    // -----------------------------( IS VISIBLE )------------------------------ \\
    private _isVisible: boolean;
    public get isVisible(): boolean {
        return this._isVisible;
    }
    public set isVisible(value: boolean) {
        this.menus.forEach(menu => {
            menu.isVisible = false;
        })
        if (!value) this.onHide.next();
        this._isVisible = value;
    }
}