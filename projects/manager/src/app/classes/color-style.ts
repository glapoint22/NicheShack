import { Color } from './color';
import { PersistentStyle } from './persistent-style';
import { Subject, Subscription } from 'rxjs';
import { Selection } from './selection';

export class ColorStyle extends PersistentStyle {
    public defaultColor: Color;
    private colorPickerOpen: boolean;
    

    // This is the color value
    private _value: Color = new Color();
    public get value(): Color {

        // Only if the color picker is open
        if (this.colorPickerOpen) {

            // Only if the color has changed
            if (this.styleValue != this._value.toRGBAString() && this.styleValue != this._value.toRGBString()) {

                // Set the style value as the new color via the color picker and apply it
                this.styleValue = this._value.toRGBAString();
                this.applyStyle();
            }
        }

        return this._value;
    }

    // Set the value
    public set value(v: Color) {
        this._value = v;
    }

    onShowColorPicker(onColorPickerClose: Subject<boolean>) {
        // Get the current selection
        let selection: Selection = this.getSelection();

        // Get a snapshot of all the contents
        // this will be used if the user does not commit to the changes
        let template = document.createElement('template');
        template.innerHTML = this.contentParentNode.innerHTML;

        // Clear the selection from the text
        this.contentDocument.getSelection().removeAllRanges();

        // If the color value is zero, assign the default color
        if (this.value.isEqual(Color.zero)) {
            this.value.copy(this.defaultColor);
        }


        // Flag that the color picker is open
        this.colorPickerOpen = true;


        // Subscribe for when the color picker closes
        let subscription: Subscription = onColorPickerClose.subscribe((canceled: boolean) => {
            // Restore the selection
            this.contentDocument.getSelection().addRange(this.selectedRange);


            // Flag that the color picker is closed
            this.colorPickerOpen = false;

            // If there was no change, remove the style
            if (canceled) {
                // Remove all contents
                this.contentParentNode.innerHTML = '';

                // Replace the contents with the previous contents
                this.contentParentNode.appendChild(template.content);
                this.setSelection(selection);
            } else {
                // Remove the start and end attributes
                this.removeAttribute(this.contentParentNode as HTMLElement, 'start');
                this.removeAttribute(this.contentParentNode as HTMLElement, 'end');
            }

            this.setFocus();

            subscription.unsubscribe();
        });
    }



    setFocus() {
        if (!this.colorPickerOpen) super.setFocus();
    }


    onSelectionChange(range: Range) {
        super.onSelectionChange(range);

        this.styleValue = this.getComputedColor();

        if (this.selectionHasStyle()) {
            let pattern = new RegExp(/rgba?\((\d+),\s(\d+),\s(\d+)(?:,\s([0-9\.]+))?/);
            let result = pattern.exec(this.styleValue);

            if (result)
                this.value = new Color(Number.parseInt(result[1]), Number.parseInt(result[2]), Number.parseInt(result[3]), result[4] ? Number.parseFloat(result[4]) : 1);
        } else {
            this.value = new Color(0, 0, 0, 0);
        }
    }

    getComputedColor(): string {
        return window.getComputedStyle(this.selectedRange.startContainer.parentElement)[this.style];
    }
}