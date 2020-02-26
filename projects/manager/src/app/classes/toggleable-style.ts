import { Style } from './style';

export class ToggleableStyle extends Style {
    public isSelected: boolean;


    onSelectionChange(range: Range) {
        super.onSelectionChange(range);

        this.isSelected = this.selectionHasStyle();
    }

    applyStyle() {
        if (!this.isSelected) {
            super.applyStyle();

            // Flag that this style is selected
            this.isSelected = true;
        } else {
            if (this.isSingleLineSelection) {
                this.removeStyle(this.selectedRange);
            } else {
                this.setMultilineStyle();
            }

            // Flag that this style is NOT selected
            this.isSelected = false;
        }

        this.setFocus();
    }


    setStyle(range: Range) {
        if (this.isSelected) {
            this.removeStyle(range);
        } else {
            super.setStyle(range);
        }
    }
}