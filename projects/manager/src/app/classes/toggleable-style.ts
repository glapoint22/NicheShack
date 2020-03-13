import { Style } from './style';

export class ToggleableStyle extends Style {
    public isSelected: boolean;

    onSelectionChange(range: Range) {
        super.onSelectionChange(range);

        this.isSelected = this.selectionHasStyle();
    }

    setStyle(range: Range) {
        if (this.isSelected) {
            this.removeStyle(range);
        } else {
            super.setStyle(range);
        }
    }

    finalizeStyle() {
        this.isSelected = !this.isSelected;
        super.finalizeStyle();
    }
}