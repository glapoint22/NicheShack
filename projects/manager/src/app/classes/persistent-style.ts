import { Style } from './style';

export class PersistentStyle extends Style {
    setStyle(range: Range) {
        let parent: HTMLElement = this.getStyleParent(range.startContainer);

        if (parent && parent != this.contentParentNode &&
            range.startOffset == 0 &&
            range.endOffset == (range.endContainer as Text).length &&
            this.getFirstTextChild(parent) == range.startContainer &&
            this.getLastTextChild(parent) == range.endContainer) {

                parent.style[this.style] = this.styleValue;

            this.removeDuplicateStyle(parent);

        } else {
            super.setStyle(range);
        }
    }

    setStyleValue(value: string) {
        this.styleValue = value;
        this.applyStyle();
    }
}