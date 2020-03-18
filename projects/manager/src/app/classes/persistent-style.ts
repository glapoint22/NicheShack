import { Style } from './style';

export class PersistentStyle extends Style {
    setStyle(range: Range) {
        let parent: HTMLElement = this.getStyleParent(range.startContainer);

        if (

            (parent && parent != this.contentParentNode &&
                range.startOffset == 0 &&
                range.endOffset == (range.endContainer as Text).length &&
                this.getFirstTextChild(parent) == range.startContainer &&
                this.getLastTextChild(parent) == range.endContainer)

            ||

            (parent && parent != this.contentParentNode && range.startContainer.nodeType == 3 && (range.startContainer as Text).length == 1 && (range.startContainer as Text).data.charCodeAt(0) == 8203)




        ) {

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