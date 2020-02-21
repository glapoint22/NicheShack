import { ToggleableStyle } from './toggleable-style';

export class LineStyle extends ToggleableStyle {
    

    applyStyle() {
        // If the style is being applied on just one line
        if (this.selectedRange.commonAncestorContainer != this.contentDocument.body.firstElementChild) {
            let parent = this.getParent(this.selectedRange.startContainer);

            // parent.style[this.style] = this.styleValue;
            this.setStyle(parent);
        } else {
            let startRangeParent = this.getParent(this.selectedRange.startContainer);
            let endRangeParent = this.getParent(this.selectedRange.endContainer);

            // startRangeParent.style[this.style] = this.styleValue;
            // endRangeParent.style[this.style] = this.styleValue;

            this.setStyle(startRangeParent);
            this.setStyle(endRangeParent);

            // Style all nodes between start & end range
            for (let i = 0; i < this.selectedRange.commonAncestorContainer.childNodes.length; i++) {
                let parentNode = this.selectedRange.commonAncestorContainer.childNodes[i] as HTMLElement;

                // Make sure node is not start or end and is not a text node
                if (this.selectedRange.intersectsNode(parentNode) &&
                    parentNode != startRangeParent &&
                    parentNode != endRangeParent) {

                    // parentNode.style[this.style] = this.styleValue;
                    this.setStyle(parentNode);
                }
            }
        }
        this.isSelected = true;
        this.setFocus();
    }

    setStyle(parent: HTMLElement) {
        parent.style[this.style] = this.styleValue;
    }
}