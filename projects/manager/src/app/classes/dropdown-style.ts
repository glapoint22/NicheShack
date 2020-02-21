import { PersistentStyle } from './persistent-style';
import { KeyValue } from '@angular/common';

export class DropdownStyle extends PersistentStyle {
    public options: Array<KeyValue<string, string>>;
    public selectedIndex: number;

    onSelectionChange(range: Range) {
        super.onSelectionChange(range);

        this.styleValue = window.getComputedStyle(this.selectedRange.startContainer.parentElement)[this.style];
        

        if(this.selectionHasStyle()) {
            this.selectedIndex = this.options.findIndex(x => x.value == this.styleValue);
        } else {
            this.selectedIndex = -1;
        }
    }

    applyStyle() {
        super.applyStyle();
        this.selectedIndex = this.options.findIndex(x => x.value == this.styleValue);
        this.setFocus();
    }
}