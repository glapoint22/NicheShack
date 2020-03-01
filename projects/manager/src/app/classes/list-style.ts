import { LineStyle } from './line-style';
import { Selection } from './selection';

export class ListStyle extends LineStyle {
    applyStyle() {
        let selection: Selection;

        if (!this.isSelected) {
            selection = this.createList();
        } else {
            selection = this.removeList();
        }

        // Set the selection
        this.setSelection(selection);
        this.setFocus();
    }


    createList() {
        let startParent = this.getParent(this.selectedRange.startContainer);
        let endParent = this.getParent(this.selectedRange.endContainer);
        let refChild = endParent.nextElementSibling;
        let listTag = document.createElement(this.style);
        let selection: Selection = this.getSelection(startParent, endParent);
        let singleLineSelection = this.isSingleLineSelection;

        // Create the list item
        listTag.appendChild(this.createListItem(startParent));


        // If multiple lines are selected
        if (!singleLineSelection) {
            for (let i = 0; i < this.selectedRange.commonAncestorContainer.childNodes.length; i++) {
                let currentNode = this.selectedRange.commonAncestorContainer.childNodes[i] as HTMLElement;
                let parentNode = this.getParent(this.getFirstTextChild(currentNode));

                if (this.selectedRange.intersectsNode(currentNode) &&
                    parentNode != startParent &&
                    parentNode != endParent) {

                    // Create the list item
                    let listItem = this.createListItem(currentNode);
                    listTag.appendChild(listItem);
                    i--;
                }
            }

            // Create the list item
            listTag.appendChild(this.createListItem(endParent));
        }

        this.contentDocument.body.firstElementChild.insertBefore(listTag, refChild);

        return selection;
    }


    removeList() {
        let startParent = this.getParent(this.selectedRange.startContainer);
        let endParent = this.getParent(this.selectedRange.endContainer);
        let selection: Selection = this.getSelection(startParent, endParent);
        let startNode;
        let endNode;
        let singleLineSelection = this.isSingleLineSelection;

        startNode = endNode = this.removeListItem(startParent);

        // If multiple lines are selected
        if (!singleLineSelection) {
            for (let i = 0; i < this.selectedRange.commonAncestorContainer.childNodes.length; i++) {
                let currentNode = this.selectedRange.commonAncestorContainer.childNodes[i] as HTMLElement;
                let parentNode = this.getParent(this.getFirstTextChild(currentNode));

                if (this.selectedRange.intersectsNode(currentNode) &&
                    parentNode != startParent &&
                    parentNode != endParent) {

                    this.removeListItem(parentNode);
                    i--;
                }
            }

            endNode = this.removeListItem(endParent);
        }

        this.selectedRange.setStart(startNode, 0);
        this.selectedRange.setEnd(endNode, 0);

        return selection;
    }


    createListItem(node: HTMLElement) {
        let listItem: any;

        // Node is NOT part of a list
        if (!this.nodeHasStyle(node)) {
            listItem = document.createElement('LI');

            // Give the list item the node's text align
            listItem.style.textAlign = node.style.textAlign;

            // Remove all styles from the node
            node.style.cssText = null;

            // Append the node contents into the list item
            listItem.appendChild(node);

            // Node is part of a list
        } else {
            let range: Range = document.createRange();
            let listParent = this.getListParent(node);

            // Select all of the list parent's contents
            range.setStartBefore(listParent.firstElementChild);
            range.setEndAfter(listParent.lastElementChild);

            // Assign all the contents from the list parent to the list item and remove the list parent
            listItem = range.extractContents();
            listParent.remove();
        }

        return listItem;
    }


    removeListItem(node: Node) {
        let range: Range = document.createRange();
        let listParent: HTMLElement = this.getListParent(node);
        let firstTextChild: Text = this.getFirstTextChild(listParent);
        let lastTextChild: Text = this.getLastTextChild(listParent);
        let refChild: ChildNode = listParent;
        let docFrag: DocumentFragment;
        let listItem: HTMLElement = node.parentElement;


        if (firstTextChild.parentElement == node || lastTextChild.parentElement == node) {

            // Set the ref child to be the list parent's next sibling
            if (firstTextChild.parentElement != node && lastTextChild.parentElement == node) {
                refChild = listParent.nextSibling;
            }


        } else {
            // We need to create a range so we can place all children before the list item
            range.setStartBefore(listParent);
            range.setEndBefore(listItem);

            // Place all children before the list item
            range.insertNode(range.extractContents());
        }

        // Extract the contents
        lastTextChild = this.getLastTextChild(node);
        range.setStartBefore(node);
        range.setEnd(lastTextChild, lastTextChild.length);
        docFrag = range.extractContents();

        // Insert the contents and remove the list item
        listParent.parentElement.insertBefore(docFrag, refChild ? refChild : listParent.nextSibling);
        listItem.remove();


        // Get the node we will be returning
        if (refChild) {
            node = refChild.previousSibling;
        } else {
            node = listParent.parentElement.lastElementChild;
        }

        // Remove all empty nodes
        this.removeEmptyNodes(this.contentDocument.body.firstElementChild as HTMLElement);

        return node;
    }


    nodeHasStyle(node: HTMLElement): boolean {
        while (node != this.contentDocument.body.firstElementChild) {
            if (node.tagName == this.style) return true;

            node = node.parentElement;
        }

        return false;
    }


    getListParent(node: Node): HTMLElement {
        while (node.parentElement != this.contentDocument.body.firstElementChild) {
            node = node.parentElement;
        }
        return node as HTMLElement;
    }
}