import { Style } from './style';
import { Selection } from './selection';

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


    getSelection(): Selection {
        let selection = new Selection();
        let range = this.selectedRange.cloneRange();
        let startParent: HTMLElement = this.getSelectionParent(this.selectedRange.startContainer);
        let endParent: HTMLElement = this.getSelectionParent(this.selectedRange.endContainer);

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


        // Set the start and end markers
        startParent.setAttribute('start', '');
        endParent.setAttribute('end', '');


        return selection;
    }

    setSelection(selection: Selection) {
        // let text: Text;
        let parent: HTMLElement;

        // Remove the end attribute and get the node the attribute was on
        parent = this.removeAttribute(this.contentParentNode as HTMLElement, 'end');

        // Set the end of the range
        this.selectedRange.setEnd(parent, 0);

        // Loop through the array of end offsets to get to the end node
        for (let i = 0; i < selection.endOffsets.length; i++) {
            this.selectedRange.setEnd(this.selectedRange.endContainer.childNodes[selection.endOffsets[i]], 0);
        }

        this.selectedRange.setEnd(this.selectedRange.endContainer, selection.endOffset);

        // Remove the start attribute and get the node the attribute was on
        parent = this.removeAttribute(this.contentParentNode as HTMLElement, 'start');

        // Set the start of the range
        this.selectedRange.setStart(parent, 0);


        // Loop through the array of start offsets to get to the start node
        for (let i = 0; i < selection.startOffsets.length; i++) {
            this.selectedRange.setStart(this.selectedRange.startContainer.childNodes[selection.startOffsets[i]], 0);
        }

        this.selectedRange.setStart(this.selectedRange.startContainer, selection.startOffset);
    }

    removeAttribute(node: HTMLElement, attribute: string) {
        for (let i = 0; i < node.childElementCount; i++) {
            let childNode = node.children[i] as HTMLElement;

            if (childNode.attributes[attribute] != null) {
                childNode.removeAttribute(attribute);
                return childNode;
            }

            let result = this.removeAttribute(childNode, attribute);

            if (result) return result;
        }
    }
}