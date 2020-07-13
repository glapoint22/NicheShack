import { Menu } from './menu';
import { Subject } from 'rxjs';

export class MainMenu {
    public toggleOn: boolean;
    public allowHide: boolean;
    public currentObj: object;
    public previousTop: number;
    public previousLeft: number;
    public menus: Array<Menu> = [];
    public onHide = new Subject<void>();


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