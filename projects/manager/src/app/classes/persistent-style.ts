import { Style } from './style';

export class PersistentStyle extends Style {
    setStyle(range: Range) {
        let parent: HTMLElement = this.getStyleParent(range.startContainer);

        if (parent && parent != this.contentParentNode &&
            range.startOffset == 0 &&
            range.endOffset == (range.endContainer as Text).length &&
            this.getFirstTextChild(parent) == range.startContainer &&
            this.getLastTextChild(parent) == range.endContainer) {

            this.assignStyle(parent);

            this.removeDuplicateStyle(parent);

        } else {
            super.setStyle(range);
        }
    }


    assignStyle(parent: HTMLElement) {
        parent.style[this.style] = this.styleValue;
    }


    setStyleValue(value: string) {
        this.styleValue = value;
        this.applyStyle();
    }
}