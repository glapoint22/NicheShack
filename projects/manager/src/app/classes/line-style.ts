import { ToggleableStyle } from './toggleable-style';
import { Selection } from './selection';

export class LineStyle extends ToggleableStyle {


    applyStyle() {
        let selection: Selection;

        // If the style is being applied on a single line
        if (this.isSingleLineSelection) {
            let parent = this.getParent(this.selectedRange.startContainer);

            if (parent.parentElement.tagName == 'LI') {
                selection = this.getSelection(parent, parent);
            }

            this.setLineStyle(parent);
        } else {
            let startRangeParent = this.getParent(this.selectedRange.startContainer);
            let endRangeParent = this.getParent(this.selectedRange.endContainer);

            if (startRangeParent.parentElement.tagName == 'LI') {
                selection = this.getSelection(startRangeParent, endRangeParent);
            }


            this.setLineStyle(startRangeParent);


            let childCount = this.selectedRange.commonAncestorContainer.childNodes.length;

            // Style all nodes between start & end range
            for (let i = 0; i < this.selectedRange.commonAncestorContainer.childNodes.length; i++) {
                let parentNode = this.getParent(this.getFirstTextChild(this.selectedRange.commonAncestorContainer.childNodes[i]));

                // Make sure the parent node is not start or end parent
                if (this.selectedRange.intersectsNode(parentNode) &&
                    parentNode != startRangeParent &&
                    parentNode != endRangeParent) {

                    this.setLineStyle(parentNode);

                    if (this.selectedRange.commonAncestorContainer.childNodes.length < childCount) i--;
                }
            }

            this.setLineStyle(endRangeParent);
        }
        this.isSelected = true;

        // Reset the selection
        if (selection) {
            this.setSelection(selection);
        }

        this.setFocus();
    }

    setLineStyle(parent: HTMLElement) {
        if (parent.parentElement.tagName == 'LI') parent = parent.parentElement;
        parent.style[this.style] = this.styleValue;
    }

    getSelection(startParent: HTMLElement, endParent: HTMLElement): Selection {
        let selection = new Selection();
        let range = this.selectedRange.cloneRange();

        // Get the start and end of the range
        selection.startOffset = this.selectedRange.startOffset;
        selection.endOffset = this.selectedRange.endOffset;


        // Getting an array of offsets will be used to set the selection
        while (range.startContainer != startParent) {
            range.setStartBefore(range.startContainer);
            selection.startOffsets.unshift(range.startOffset);
        }


        while (range.endContainer != endParent) {
            range.setEndBefore(range.endContainer);
            selection.endOffsets.unshift(range.endOffset);
        }


        return selection;
    }

    setSelection(selection: Selection) {
        let text: Text;
        let parent: HTMLElement;

        if (this.selectedRange.endContainer.nodeType != 3) {
            // Getting the last text child and then it's parent marks the starting point from which we will navigate to find the end of the selection
            text = this.getLastTextChild(this.selectedRange.endContainer.childNodes[this.selectedRange.endOffset]);
            parent = this.getParent(text);

            // Set the end of the range
            this.selectedRange.setEnd(parent, 0);

            // Loop through the array of end offsets to get to the end node
            for (let i = 0; i < selection.endOffsets.length; i++) {
                this.selectedRange.setEnd(this.selectedRange.endContainer.childNodes[selection.endOffsets[i]], 0);
            }

            this.selectedRange.setEnd(this.selectedRange.endContainer, selection.endOffset);
        }


        if (this.selectedRange.startContainer.nodeType != 3) {
            // Getting the first text child and then it's parent marks the starting point from which we will navigate to find the start of the selection
            text = this.getFirstTextChild(this.selectedRange.startContainer.childNodes[this.selectedRange.startOffset]);
            parent = this.getParent(text);

            // Set the start of the range
            this.selectedRange.setStart(parent, 0);


            // Loop through the array of start offsets to get to the start node
            for (let i = 0; i < selection.startOffsets.length; i++) {
                this.selectedRange.setStart(this.selectedRange.startContainer.childNodes[selection.startOffsets[i]], 0);
            }

            this.selectedRange.setStart(this.selectedRange.startContainer, selection.startOffset);
        }
    }
}