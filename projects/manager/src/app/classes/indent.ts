import { LineStyle } from './line-style';
import { Selection } from './selection';

export class Indent extends LineStyle {
    public indentDirection: number;
    private selection: Selection;

    constructor(contentDocument: HTMLDocument) {
        super(contentDocument);

        this.style = 'marginLeft';
    }


    applyStyle() {
        this.selection = this.getSelection();

        super.applyStyle();
    }

    finalizeStyle() {
        // Consolidate lists
        this.consolidateLists(this.contentParentNode as HTMLElement);

        // Set the selection
        this.setSelection(this.selection);

        // Remove any empty or blank text nodes that may have been generated
        this.removeEmptyNodes(this.contentParentNode as HTMLElement);

        // Set the focus back to the text
        this.setFocus();
    }


    consolidateLists(parent: HTMLElement) {
        for (let i = 0; i < parent.childNodes.length; i++) {
            let currentNode = parent.childNodes[i] as HTMLElement;

            if (currentNode.tagName == 'UL' || currentNode.tagName == 'OL') {
                if (currentNode != parent.lastElementChild) {
                    if (currentNode.nextElementSibling.tagName == currentNode.tagName) {
                        let sibling = currentNode.nextElementSibling;
                        let range: Range = document.createRange();

                        range.setStartBefore(sibling.firstChild);
                        range.setEndAfter(sibling.lastChild);
                        let contents = range.extractContents();
                        currentNode.appendChild(contents);
                        sibling.remove();
                        i--;
                    }
                }
                this.consolidateLists(currentNode);
            }
        }
    }



    assignStyle(parent: HTMLElement) {
        let currentIndent: number;

        // Get the amount we need to indent by getting the current indent value
        if (this.hasStyle(parent)) {
            currentIndent = Number.parseInt(parent.style[this.style].match(/\d+/));
        } else {
            currentIndent = 0;
        }

        // Increase or decrease the indent
        currentIndent += 40 * this.indentDirection;

        // Don't go below zero
        currentIndent = Math.max(0, currentIndent);

        // Set the value
        this.styleValue = currentIndent + 'px';
        super.assignStyle(parent);
    }
}