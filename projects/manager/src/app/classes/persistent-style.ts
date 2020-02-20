import { Style } from './style';

export class PersistentStyle extends Style {

    applyStyle() {
        let styleParent: HTMLElement = this.getStyleParent(this.selectedRange.startContainer);

        if (styleParent && styleParent != this.contentDocument.body.firstElementChild &&
            this.selectedRange.startOffset == 0 &&
            this.selectedRange.endOffset == (this.selectedRange.endContainer as Text).length &&
            this.getFirstTextChild(styleParent) == this.selectedRange.startContainer &&
            this.getLastTextChild(styleParent) == this.selectedRange.endContainer) {

            styleParent.style[this.style] = this.styleValue;

            this.removeDuplicateStyle(styleParent);

        } else {
            super.applyStyle();
        }
    }

    setStyleValue(value: string) {
        this.styleValue = value;
        this.applyStyle();
    }
}