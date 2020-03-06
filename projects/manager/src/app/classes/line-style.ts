import { PersistentStyle } from './persistent-style';
import { Selection } from './selection';

export class LineStyle extends PersistentStyle {
    public isSelected: boolean;

    setStyle(range: Range) {
        let parent = this.getSelectionParent(range.startContainer);

        if (parent.parentElement.tagName == 'LI') parent = parent.parentElement;
        this.assignStyle(parent);
        this.isSelected = true;
    }

    onSelectionChange(range: Range) {
        super.onSelectionChange(range);

        this.isSelected = this.selectionHasStyle();
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

        parent = this.getSelectionNode(this.contentParentNode as HTMLElement, 'end');

        // Set the end of the range
        this.selectedRange.setEnd(parent, 0);

        // Loop through the array of end offsets to get to the end node
        for (let i = 0; i < selection.endOffsets.length; i++) {
            this.selectedRange.setEnd(this.selectedRange.endContainer.childNodes[selection.endOffsets[i]], 0);
        }

        this.selectedRange.setEnd(this.selectedRange.endContainer, selection.endOffset);
        parent = this.getSelectionNode(this.contentParentNode as HTMLElement, 'start');

        // Set the start of the range
        this.selectedRange.setStart(parent, 0);


        // Loop through the array of start offsets to get to the start node
        for (let i = 0; i < selection.startOffsets.length; i++) {
            this.selectedRange.setStart(this.selectedRange.startContainer.childNodes[selection.startOffsets[i]], 0);
        }

        this.selectedRange.setStart(this.selectedRange.startContainer, selection.startOffset);
    }

    getSelectionNode(node: HTMLElement, attribute: string) {
        for (let i = 0; i < node.childElementCount; i++) {
            let childNode = node.children[i] as HTMLElement;

            if (childNode.attributes[attribute] != null) {
                childNode.removeAttribute(attribute);
                return childNode;
            }

            let result = this.getSelectionNode(childNode, attribute);

            if (result) return result;
        }
    }
}