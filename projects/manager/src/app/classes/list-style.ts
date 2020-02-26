import { LineStyle } from './line-style';
import { Selection } from './selection';

export class ListStyle extends LineStyle {
    applyStyle() {
        let listTag = document.createElement(this.style);
        let contentParent: HTMLElement;
        let refChild: HTMLElement;
        let selection: Selection;


        // Single line is selected
        if (this.isSingleLineSelection) {
            let parent = this.getParent(this.selectedRange.startContainer);

            // Used for inserting the content before this node
            refChild = parent.nextElementSibling as HTMLElement;

            // The node that holds all the content
            contentParent = parent.parentElement;

            // This will get the current selection that can be used later to reselect the content when the selection is lost
            selection = this.getSelection(parent, parent);

            // Create the list item
            listTag.appendChild(this.createListItem(parent));


            // Multiple lines are selected
        } else {
            let startParent = this.getParent(this.selectedRange.startContainer);
            let endParent = this.getParent(this.selectedRange.endContainer);

            // This will get the current selection that can be used later to reselect the content when the selection is lost
            selection = this.getSelection(startParent, endParent);

            // Used for inserting the content before this node
            refChild = endParent.nextElementSibling as HTMLElement;

            // The node that holds all the content
            contentParent = endParent.parentElement;

            // Create the list item
            listTag.appendChild(this.createListItem(startParent));


            // Style all nodes between start & end range
            for (let i = 0; i < this.selectedRange.commonAncestorContainer.childNodes.length; i++) {
                let parentNode = this.selectedRange.commonAncestorContainer.childNodes[i] as HTMLElement;

                // Make sure the parent node is not start or end parent
                if (this.selectedRange.intersectsNode(parentNode) &&
                    parentNode != endParent) {

                    // Create the list item
                    listTag.appendChild(this.createListItem(parentNode));
                    i--;
                }
            }


            // Create the list item
            listTag.appendChild(this.createListItem(endParent));

        }


        // this will insert the list tag with all of its line items within the content parent
        contentParent.insertBefore(listTag, refChild);

        // Set the selection
        this.isSelected = true;
        this.setSelection(selection);
        this.setFocus();
    }


    createListItem(node: HTMLElement) {
        let listItem = document.createElement('LI');

        listItem.style.textAlign = node.style.textAlign;
        node.style.cssText = null;


        listItem.appendChild(node);
        return listItem;
    }


    nodeHasStyle(node: HTMLElement): boolean {
        while (node != this.contentDocument.body.firstElementChild) {
            if (node.tagName == this.style) return true;

            node = node.parentElement;
        }

        return false;
    }
}