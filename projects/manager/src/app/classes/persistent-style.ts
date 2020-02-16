import { Style } from './style';

export class PersistentStyle extends Style {

    applyStyle() {
        let endContainer: Text = this.selectedRange.endContainer as Text;

        if(this.selectedRange.startOffset == 0 && this.selectedRange.endOffset == endContainer.length) {
            let styleParent = this.getStyleParent(this.selectedRange.startContainer);

            if(styleParent) {
                styleParent.parentElement.style[this.style] = this.styleValue;
            } else {
                super.applyStyle();
            }
        } else {
            super.applyStyle();
        }
    }
}