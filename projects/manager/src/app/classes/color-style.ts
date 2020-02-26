import { Color } from './color';
import { PersistentStyle } from './persistent-style';
import { Subject, Subscription } from 'rxjs';

export class ColorStyle extends PersistentStyle {
    public defaultColor: Color;
    private colorPickerOpen: boolean;
    private initialColor: Color = new Color();

    // This is the color value
    private _value: Color = new Color();
    public get value(): Color {

        // Only if the color picker is open
        if (this.colorPickerOpen) {

            // Only if the color has changed
            if (this.styleValue != 'rgb(' + this._value.r + ', ' + this._value.g + ', ' + this._value.b + ', ' + this._value.a + ')') {

                // Set the style value as the new color via the color picker and apply it
                this.styleValue = 'rgb(' + this._value.r + ', ' + this._value.g + ', ' + this._value.b + ', ' + this._value.a + ')';
                this.applyStyle();
            }
        }

        return this._value;
    }

    // Set the value
    public set value(v: Color) {
        this._value = v;
    }


    onShowColorPicker(onColorPickerClose: Subject<void>) {
        // Flag that the color picker is open
        this.colorPickerOpen = true;

        // Clear the selection from the text
        this.contentDocument.getSelection().removeAllRanges();

        // If the color value is zero, assign the default color
        if(this.value.isEqual(Color.zero)) {
            this.value.copy(this.defaultColor);
        }

        // Get the initial color
        this.initialColor.copy(this.value);


        // Subscribe for when the color picker closes
        let subscription: Subscription = onColorPickerClose.subscribe(() => {
            // Restore the selection
            this.contentDocument.getSelection().addRange(this.selectedRange);

            // If there was no change, remove the style
            if (this.initialColor.isEqual(this.value)) {
                this.removeStyle(this.selectedRange);
            }

            // Set the focus back to the text
            this.setFocus();

            // Flag that the color picker is closed
            this.colorPickerOpen = false;


            subscription.unsubscribe();
        });
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
            this.value = new Color(255, 255, 255, 1);
        }
    }

    getComputedColor(): string {
        return window.getComputedStyle(this.selectedRange.startContainer.parentElement)[this.style];
    }
}