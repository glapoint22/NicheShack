import { Indent } from './indent';
import { Subject } from 'rxjs';

export class DecreaseIndent extends Indent {

    constructor(contentDocument: HTMLDocument, onChange: Subject<void>) {
        super(contentDocument, onChange);

        this.indentDirection = -1;
    }


    assignStyle(parent: HTMLElement) {
        if (parent.tagName == 'LI') {
            let listItem = parent;
            let listParent: HTMLElement = listItem.parentElement;
            let container: HTMLElement = listParent.parentElement;

            if (container != this.contentParentNode) {
                let docFrag: DocumentFragment = document.createDocumentFragment();

                // Used for inserting the list item before this node
                let refChild: Node = listParent

                // If the list item is the list parent's first child or last child
                if (listItem == listParent.firstElementChild || listItem == listParent.lastElementChild) {

                    // Set the ref child to be the list parent's next sibling if the list item is the last child
                    if (listItem == listParent.lastElementChild) {
                        refChild = listParent.nextSibling;
                    }

                    // List item is not the first or last child
                } else {
                    // We need to create a range so we can place all children before the list item
                    let range = document.createRange();

                    range.setStartBefore(listParent);
                    range.setEndBefore(listItem);

                    // Place all children before the list item
                    range.insertNode(range.extractContents());
                }


                // Insert the list item before the reference child
                docFrag.appendChild(listItem);
                container.insertBefore(docFrag, refChild);


                // Remove the list parent if there are no more children
                if (listParent.childElementCount == 0) listParent.remove();
            }
        } else {
            super.assignStyle(parent);
        }
    }
}