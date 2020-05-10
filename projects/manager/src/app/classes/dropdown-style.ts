import { PersistentStyle } from './persistent-style';
import { KeyValue } from '@angular/common';

export class DropdownStyle extends PersistentStyle {
    public options: Array<KeyValue<string, string>>;
    public selectedIndex: number;

    onSelectionChange(range: Range) {
        super.onSelectionChange(range);

        this.styleValue = window.getComputedStyle(this.selectedRange.startContainer.parentElement)[this.style];


        if (this.selectionHasStyle()) {
            this.selectedIndex = this.options.findIndex(x => x.value == this.styleValue);

            if (this.selectedIndex == -1) {
                this.options[0] = {
                    key: this.styleValue.substr(0, this.styleValue.length - 2),
                    value: this.styleValue
                }
                this.selectedIndex = 0;
            }

        } else {
            this.selectedIndex = -1;
        }
    }

    applyStyle() {
        // If there is no selected range, that means there is not a content document
        // and we do not need to apply a style
        if (this.selectedRange) {
            super.applyStyle();
        }

        this.selectedIndex = this.options.findIndex(x => x.value == this.styleValue);
    }
}