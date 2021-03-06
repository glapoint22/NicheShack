import { Style } from './style';


export class LineStyle extends Style {
    public isSelected: boolean;

    setStyle(range: Range) {
        let parent = this.getSelectionParent(range.startContainer);

        if (parent.parentElement.tagName == 'LI') parent = parent.parentElement;
        this.assignStyle(parent);
        this.isSelected = true;
    }

    onSelectionChange(range: Range) {
        super.onSelectionChange(range);

        this.isSelected = this.selectionHasStyle();
    }

    assignStyle(parent: HTMLElement) {
        parent.style[this.style] = this.styleValue;
    }
}