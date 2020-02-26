import { Indent } from './indent';

export class IncreaseIndent extends Indent {

    constructor(contentDocument: HTMLDocument) {
        super(contentDocument);

        this.indentDirection = 1;
    }


    setLineStyle(parent: HTMLElement) {
        // if we are indenting a list item
        if (parent.parentElement.tagName == 'LI') {
            let listTag = document.createElement(parent.parentElement.parentElement.tagName);
            let contentParent = parent.parentElement.parentElement;
            let refChild = parent.parentElement.nextSibling;

            // Indent the list item by appending it inside a list tag (UL or OL)
            listTag.appendChild(parent.parentElement);
            contentParent.insertBefore(listTag, refChild);

            // We are not indenting a list item
        } else {
            super.setLineStyle(parent);
        }

    }

}