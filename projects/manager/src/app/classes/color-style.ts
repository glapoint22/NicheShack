import { Color } from './color';
import { PersistentStyle } from './persistent-style';
import { Subscription } from 'rxjs';
import { ColorPickerPopupComponent } from '../shared-components/popups/color-picker-popup/color-picker-popup.component';

export class ColorStyle extends PersistentStyle {
    public defaultColor: Color;
    private colorPickerOpen: boolean;
    private colorPickerSubscription: Subscription;


    // ColorPicker
    public set colorPicker(colorPicker: ColorPickerPopupComponent) {
        if (this.colorPickerSubscription) this.colorPickerSubscription.unsubscribe();

        this.colorPickerSubscription = colorPicker.onPopupClose.subscribe(() => {
            if (this.colorPickerOpen) {
                // Restore the selection
                this.contentDocument.getSelection().removeAllRanges();
                this.contentDocument.getSelection().addRange(this.selectedRange);


                // Flag that the color picker is closed
                this.colorPickerOpen = false;

                this.setFocus();
            }
        });
    }



    // This is the color value
    private _value: Color = new Color();
    public get value(): Color {

        // Only if the color picker is open
        if (this.colorPickerOpen) {

            // Only if the color has changed
            if (this.styleValue != this._value.toRGBString()) {

                // Set the style value as the new color via the color picker and apply it
                this.styleValue = this._value.toRGBString();
                this.applyStyle();
            }
        }

        return this._value;
    }

    // Set the value
    public set value(v: Color) {
        this._value = v;
    }


    onColorPickerOpen() {
        // If the color value is zero, assign the default color
        if (this.value.isEqual(Color.zero)) {
            this.value.copy(this.defaultColor);
            this.styleValue = Color.zero.toRGBString();
        }

        // Clear the selection from the text
        this.contentDocument.getSelection().removeAllRanges();

        // Flag that the color picker is open
        this.colorPickerOpen = true;
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