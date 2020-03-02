import { Style } from './style';

export class PersistentStyle extends Style {

    applyStyle() {
        if (this.isSingleLineSelection) {
            this.setStyle(this.selectedRange);
        } else {
            this.setMultilineStyle();
        }

        this.removeEmptyNodes(this.contentDocument.body.firstElementChild as HTMLElement);
    }

    setStyle(range: Range) {
        let styleParent: HTMLElement = this.getStyleParent(range.startContainer);

        if (styleParent && styleParent != this.contentDocument.body.firstElementChild &&
            range.startOffset == 0 &&
            range.endOffset == (range.endContainer as Text).length &&
            this.getFirstTextChild(styleParent) == range.startContainer &&
            this.getLastTextChild(styleParent) == range.endContainer) {

            styleParent.style[this.style] = this.styleValue;

            this.removeDuplicateStyle(styleParent);

        } else {
            super.setStyle(range);
        }
    }


    setStyleValue(value: string) {
        this.styleValue = value;
        this.applyStyle();
    }
}