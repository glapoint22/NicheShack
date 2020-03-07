import { PersistentStyle } from './persistent-style';


export class LineStyle extends PersistentStyle {
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
}