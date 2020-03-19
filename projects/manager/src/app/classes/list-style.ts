import { Selection } from './selection';
import { NodeStyle } from './node-style';

export class ListStyle extends NodeStyle {
    applyStyle() {
        // Get the current selection
        // This is needed for when we lose the selection, we'll have to set the selection again
        let selection: Selection = this.getSelection();

        // Here we need to determine if the list style we are applying is over the alternate list style
        // If so, we need to switch the selected list style to the current list style
        this.style = this.style == 'UL' ? 'OL' : 'UL';
        let selectionHasListStyle = this.selectionHasListStyle(this.contentParentNode);
        this.style = this.style == 'UL' ? 'OL' : 'UL';

        if (selectionHasListStyle) {
            this.switchListStyle();
        } else if (!this.isSelected) {
            this.createList();
        } else {
            this.removeList();
        }

        this.consolidateLists(this.contentParentNode);


        // Set the selection and give back the focus to the text
        this.setSelection(selection);

        this.checkSelection();

        this.setFocus();
    }


    checkSelection() {
        this.isSelected = this.selectionHasStyle();
    }


    switchListStyle() {
        let startElement: HTMLElement = this.getSelectionParent(this.selectedRange.startContainer).parentElement;
        let container: HTMLElement = document.createElement(this.style);
        let range: Range = document.createRange();
        let topParent: HTMLElement = this.getTopParent(this.selectedRange.startContainer);
        let startParent: HTMLElement;
        let refChild: Node;

        // Get the start parent from where to start the switch and the reference child from where to insert the contents
        if (startElement == this.contentParentNode || topParent.firstElementChild == startElement) {
            refChild = topParent.previousSibling;
            startParent = this.contentParentNode as HTMLElement;
        } else {
            range.setStartBefore(topParent);
            range.setEndBefore(startElement);
            range.insertNode(range.extractContents());
            refChild = topParent.previousSibling;
            startParent = this.selectedRange.commonAncestorContainer == this.contentParentNode ? this.contentParentNode as HTMLElement : topParent;
        }


        // Append the start parent's children into the new list container
        this.appendChildrenIntoContainer(container, startParent);

        // Insert the new container before the reference child
        this.contentParentNode.insertBefore(container, refChild ? refChild.nextSibling : this.contentParentNode.firstElementChild);

        // Remove any empty nodes
        this.removeEmptyNodes(this.contentParentNode as HTMLElement);
    }



    appendChildrenIntoContainer(container: HTMLElement | DocumentFragment, parent: HTMLElement) {
        for (let i = 0; i < parent.childNodes.length; i++) {
            let currentNode = parent.childNodes[i] as HTMLElement;

            // Test to see if the current node is in the selected range
            if (this.selectedRange.intersectsNode(currentNode)) {

                // Test to see if the current node is a list element
                if (currentNode.tagName == 'UL' || currentNode.tagName == 'OL') {
                    let childContainer: HTMLElement | DocumentFragment;

                    // If we are on the first level of containers, create a document fragment
                    // Else, create a list container
                    if (parent == this.contentParentNode) {
                        childContainer = document.createDocumentFragment();
                    } else {
                        childContainer = document.createElement(this.style);
                    }

                    // Append the current node's children into the given child container
                    this.appendChildrenIntoContainer(childContainer, currentNode);

                    // Append the child container into the parent container
                    container.appendChild(childContainer);

                    // The current node is NOT a list element
                } else {
                    let listItem;

                    // If the current node is not a list item, wrap the current node into a new list item
                    if (currentNode.tagName != 'LI') {
                        listItem = document.createElement('LI');
                        listItem.appendChild(currentNode);
                    } else {
                        listItem = currentNode;
                    }

                    // Append the current list item into the container
                    container.appendChild(listItem);
                }

                i--;

                // If the current node is beyond the selected range, return
            } else if (this.selectedRange.comparePoint(currentNode, 0) == 1) {
                return;
            }

        }

        // If the parent is not the content node and has no children, remove it
        if (parent != this.contentParentNode && parent.childElementCount == 0) parent.remove();
    }



    createList() {
        let refChild: Node = this.getListParent(this.selectedRange.endContainer).nextSibling;
        let listTag: HTMLElement = document.createElement(this.style);

        if (this.isSingleLineSelection) {
            listTag.appendChild(this.createListItem(this.getListParent(this.selectedRange.startContainer)));
        } else {
            this.createMultilineLists(listTag);
        }

        this.contentParentNode.insertBefore(listTag, refChild);
    }



    createMultilineLists(listTag: HTMLElement) {
        for (let i = 0; i < this.selectedRange.commonAncestorContainer.childNodes.length; i++) {
            let currentNode = this.selectedRange.commonAncestorContainer.childNodes[i] as HTMLElement;

            // Test to see if the current node is in the selected range
            if (this.selectedRange.intersectsNode(currentNode)) {
                listTag.appendChild(this.createListItem(currentNode));
                i--;

                // If the current node is beyond the selected range, return
            } else if (this.selectedRange.comparePoint(currentNode, 0) == 1) {
                return;
            }
        }
    }




    removeList() {
        if (this.isSingleLineSelection) {
            this.removeListItem(this.getSelectionParent(this.selectedRange.startContainer));
        } else {
            this.removeMultilineLists();
        }
    }


    removeMultilineLists() {
        for (let i = 0; i < this.selectedRange.commonAncestorContainer.childNodes.length; i++) {
            let currentNode = this.selectedRange.commonAncestorContainer.childNodes[i] as HTMLElement;
            let parentNode = this.getSelectionParent(this.getFirstTextChild(currentNode));

            // Test to see if the current node is in the selected range
            if (this.selectedRange.intersectsNode(currentNode)) {
                this.removeListItem(parentNode);
                i--;

                // If the current node is beyond the selected range, return
            } else if (this.selectedRange.comparePoint(currentNode, 0) == 1) {
                return;
            }
        }
    }


    createListItem(node: HTMLElement) {
        let listItem: any;

        // Node is NOT part of a list
        if (!this.nodeHasStyle(node)) {
            listItem = document.createElement('LI');

            // Give the list item the node's text align
            listItem.style.textAlign = node.style.textAlign;

            // Remove all styles from the node
            node.removeAttribute('style');

            // Append the node contents into the list item
            listItem.appendChild(node);

            // Node is part of a list
        } else {
            let range: Range = document.createRange();
            let listParent = this.getTopParent(node);

            // Select all of the list parent's contents
            range.setStartBefore(listParent.firstElementChild);
            range.setEndAfter(listParent.lastElementChild);

            // Assign all the contents from the list parent to the list item and remove the list parent
            listItem = range.extractContents();
            listParent.remove();
        }

        return listItem;
    }


    getListParent(node: Node) {
        if (this.isSingleLineSelection) return this.getSelectionParent(node);

        while (node.parentElement != this.selectedRange.commonAncestorContainer) {
            node = node.parentElement;
        }

        return node as HTMLElement;
    }


    removeListItem(node: Node) {
        let range: Range = document.createRange();
        let listParent: HTMLElement = this.getTopParent(node);
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

        // Remove all empty nodes
        this.removeEmptyNodes(this.contentParentNode as HTMLElement);
    }


    getTopParent(node: Node): HTMLElement {
        while (node.parentElement != this.contentParentNode) {
            node = node.parentElement;
        }
        return node as HTMLElement;
    }


    selectionHasListStyle(node: ChildNode): boolean {
        for (let i = 0; i < node.childNodes.length; i++) {
            let childNode = node.childNodes[i];

            if (childNode.nodeType == 3) {
                if (this.selectedRange.intersectsNode(childNode)) {
                    if (this.nodeHasStyle(childNode.parentElement)) return true;
                    if (childNode == this.selectedRange.endContainer) return false;
                }
            }

            let result = this.selectionHasListStyle(childNode);
            if (result == true || result == false) {
                return result;
            }
        }
    }
}