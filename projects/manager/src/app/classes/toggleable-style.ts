import { Style } from './style';

export class ToggleableStyle extends Style {
    public isSelected: boolean;


    onSelectionChange(range: Range) {
        super.onSelectionChange(range);

        this.isSelected = this.selectionHasStyle();
    }

    applyStyle() {
        if (!this.isSelected) {
            super.applyStyle();

            // Flag that this style is selected
            this.isSelected = true;
        } else {
            if (this.selectedRange.commonAncestorContainer != this.contentDocument.body.firstElementChild) {
                this.removeStyle(this.selectedRange);
            } else {
                // Create the start range
                let startRange: Range = document.createRange();
                let startRangeParent: HTMLElement = this.getParent(this.selectedRange.startContainer);
                let lastTextChild: Text = this.getLastTextChild(startRangeParent.lastChild);

                // Set the start and end of the range
                startRange.setStart(this.selectedRange.startContainer, this.selectedRange.startOffset);
                startRange.setEnd(lastTextChild, lastTextChild.length);

                // Remove the style for the start range
                this.removeStyle(startRange);



                // Create the end range
                let endRange: Range = document.createRange();
                let endRangeParent: HTMLElement = this.getParent(this.selectedRange.endContainer);

                // Set the start and end of the range
                endRange.setStart(this.getFirstTextChild(endRangeParent), 0);
                endRange.setEnd(this.selectedRange.endContainer, this.selectedRange.endOffset);

                // Remove the style for the end range
                this.removeStyle(endRange);




                // Remove style between start & end range
                for (let i = 0; i < this.selectedRange.commonAncestorContainer.childNodes.length; i++) {
                    let childNode = this.selectedRange.commonAncestorContainer.childNodes[i];

                    // Make sure node is not start or end and is not a text node
                    if (this.selectedRange.intersectsNode(childNode) &&
                        childNode != startRangeParent &&
                        childNode != endRangeParent &&
                        childNode.nodeType != 3) {

                        // Create the mid range
                        let midRange: Range = document.createRange();
                        let lastTextChild: Text = this.getLastTextChild(childNode.lastChild);

                        // Set the start and end of the range
                        midRange.setStart(this.getFirstTextChild(childNode), 0);
                        midRange.setEnd(lastTextChild, lastTextChild.length);

                        // Remove the style for the mid range
                        this.removeStyle(midRange);
                    }
                }

                // Update the selection
                this.selectedRange.setStart(startRange.startContainer, startRange.startOffset);
                this.selectedRange.setEnd(endRange.endContainer, endRange.endOffset);

            }

            // Flag that this style is NOT selected
            this.isSelected = false;
        }

        this.setFocus();
    }
}