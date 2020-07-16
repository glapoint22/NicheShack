import { DropdownOption } from './dropdown-option';
import { Subject } from 'rxjs';
import { KeyValue } from '@angular/common';

export class DropdownMenu {
    public top: number;
    public left: number;
    public width: number;
    public toggleOn: boolean;
    public allowHide: boolean;
    public currentObj: object;
    public isEditable: boolean;
    public previousTop: number;
    public previousLeft: number;
    public selectedIndex: number;
    public arrowKeyFunction: Function;
    public onHide = new Subject<void>();
    public optionSelectFunction: Function;
    public selectedOption: DropdownOption;
    public list: Array<DropdownOption> = [];
    public restoreIndexFunction: Function;


    // -----------------------------( INITIALIZE )------------------------------ \\
    initialize(currentObj: object, dropdown: HTMLElement, isEditable: boolean, dropdownList: Array<KeyValue<any, any>>, optionSelectFunction: Function, arrowKeyFunction: Function, restoreIndexFunction: Function) {
        this.allowHide = false;
        this.isEditable = isEditable;
        this.width = dropdown.offsetWidth;
        this.arrowKeyFunction = arrowKeyFunction;
        this.optionSelectFunction = optionSelectFunction;
        this.restoreIndexFunction = restoreIndexFunction;
        this.left = dropdown.getBoundingClientRect().left;
        this.list = dropdownList.map(x => new DropdownOption({ key: x.key, value: x.value }));
        this.top = dropdown.getBoundingClientRect().top + dropdown.getBoundingClientRect().height - 1;

        // If the left or top positions of the menu differs from the recorded left or top positions, then
        // that means we're selecting a different dropdown instead of toggling the same dropdown on and off
        if (this.left != this.previousLeft || this.top != this.previousTop) {

            // We may come across a situation where the previous dropdown still has its menu open and its selected 
            // index value is different from its initial selected index value, so here we'll assign its current selected
            // index value back to the recorded initial selected index value just in case
            if (this.currentObj != null) this.restoreIndexFunction.apply(this.currentObj)

            // Reset for the new dropdown
            this.isVisible = false;
        }

        // Update
        this.currentObj = currentObj;
        this.previousTop = this.top;
        this.previousLeft = this.left;

        // Delay assigning the values
        window.setTimeout(() => {
            // The menu will get hidden as soon as it opens because the mousedown event that initially opens the menu causes
            // the menu to lose focus, which then triggers the blur event to hide the menu. To prevent this, we delay the
            // setting of the allowMenuHide value to true so it dosn't allow the blur event to hide the menu when it first opens
            this.allowHide = true;

            // When the menu is being toggled on, it will lose focus as soon as it opens because the mousedown event that initially opens
            // the menu causes the menu to lose the focus. We delay the assigning of the showMenu value so we can avoid this mouse down problem
            this.isVisible = !this.isVisible;
        })
    }


    // -----------------------------( ON SHOW )------------------------------ \\
    onShow(htmlMenu: HTMLElement) {
        // Set the focus to the menu
        htmlMenu.focus();
        // Get the selected option by the selected index that's defined
        this.selectedOption = this.list[this.selectedIndex];
    }


    // -----------------------------( SET MENU POSITION )------------------------------ \\
    setMenuPosition(htmlMenu: HTMLElement) {
        let menuLeft = this.left;
        let menuRight = this.left + htmlMenu.getBoundingClientRect().width;
        let menuOffset = menuRight - window.innerWidth;

        // If the menu extends beyond the left side of the screen
        if (menuLeft < 0) {
            // Re-adjust the position of the menu so that the left side of the menu is placed against the left side of the screen
            htmlMenu.style.left = 0 + "px";


            // If the menu extends beyond the right side of the screen
        } else if (menuRight > window.innerWidth) {
            // Re-adjust the position of the menu so that the right side of the menu is placed against the right side of the screen
            htmlMenu.style.left = (menuLeft - menuOffset) + "px";


            // If the menu does NOT extend beyond either side of the screen
        } else {
            // Place the menu as intended
            htmlMenu.style.left = menuLeft + "px";
        }

        // Set the menu's top position
        htmlMenu.style.top = this.top + "px";
    }


    // -----------------------------( ON MENU BLUR )------------------------------ \\
    onMenuBlur() {
        // If the menu has not yet been hidden
        if (this.isVisible) {
            // It means a menu option was never selected, so restore the selected index value back to its original value
            this.restoreIndexFunction.apply(this.currentObj)
        }

        // The menu will get hidden as soon as it opens because the mousedown event that initially opens the menu 
        // causes the menu to lose focus, which then triggers the blur event to hide the menu. To prevent this, we
        // don't allow the blur event to hide the menu when it first opens
        if (this.allowHide) {
            this.isVisible = false;
        }
    }


    // -----------------------------( ON ENTER )------------------------------ \\
    onEnter() {
        this.isVisible = false;
        this.selectedOption.onClick(this, this.selectedOption);
    }


    // -----------------------------( ON ESCAPE )------------------------------ \\
    onEscape() {
        this.isVisible = false;
        this.restoreIndexFunction.apply(this.currentObj)
    }


    // -----------------------------( ON UP ARROW KEY )------------------------------ \\
    onUpArrow() {
        this.selectedIndex--;
        this.selectedOption = this.list[this.selectedIndex];

        if (this.selectedIndex < 0) {
            this.selectedIndex = 0;
        }
        this.arrowKeyFunction.apply(this.currentObj);
    }


    // -----------------------------( ON DOWN ARROW KEY )------------------------------ \\
    onDownArrow() {
        this.selectedIndex++;
        this.selectedOption = this.list[this.selectedIndex];


        if (this.selectedIndex > this.list.length - 1) {
            this.selectedIndex = this.list.length - 1;
        }
        this.arrowKeyFunction.apply(this.currentObj);
    }


    // -----------------------------( IS VISIBLE )------------------------------ \\
    private _isVisible: boolean;
    public get isVisible(): boolean {
        return this._isVisible;
    }
    public set isVisible(value: boolean) {
        if (!value) this.onHide.next();
        this._isVisible = value;
    }
}