import { Indent } from './indent';
import { Subject } from 'rxjs';

export class IncreaseIndent extends Indent {

    constructor(contentDocument: HTMLDocument, onChange: Subject<void>) {
        super(contentDocument, onChange);

        this.indentDirection = 1;
    }


    assignStyle(parent: HTMLElement) {
        if (parent.tagName == 'LI') {
            let refChild = parent.nextSibling;
            let listParent = parent.parentElement;
            let listTag = document.createElement(listParent.tagName);

            listTag.appendChild(parent);
            listParent.insertBefore(listTag, refChild);
        } else {
            super.assignStyle(parent);
        }
    }
}