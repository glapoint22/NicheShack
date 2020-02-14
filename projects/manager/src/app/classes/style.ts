export class Style {

    public style: string;
    public styleValue: string;
    public selectedRange: Range;

    constructor(public contentDocument: HTMLDocument) {
        contentDocument.addEventListener("mouseup", () => {
            this.selectedRange = contentDocument.getSelection().getRangeAt(0);
            this.checkSelection();
        });
    }

    checkSelection() { }


    createStyle(range: Range) {
        // Create the span element
        let span = document.createElement("span");

        // Apply the style
        span.style[this.style] = this.styleValue;

        // Insert the contents at the start of the range
        span.appendChild(range.extractContents());
        range.insertNode(span);

        // // Remove any residual elements
        // this.cleanUp(this.getParent(range.startContainer));

        // this.removeDuplicateStyle(span);

        // this.mergeTextNodes(span);

        // // Update the selection
        // range.setStart(this.getFirstTextChild(span), 0);
        // let lastTextChild = this.getLastTextChild(span);
        // range.setEnd(lastTextChild, lastTextChild.length);
    }



    getParent(node: Node): HTMLElement {
        while (node.parentElement != this.contentDocument.body.firstElementChild) {
            node = node.parentElement;
        }
        return node as HTMLElement;
    }



    applyStyle() {
        // If the style is being applied on just one line
        if (this.selectedRange.commonAncestorContainer != this.contentDocument.body.firstElementChild) {
            this.createStyle(this.selectedRange);
        } else {
            // Create the start range
            let startRangeParent: HTMLElement = this.getParent(this.selectedRange.startContainer);
            let startRange: Range = document.createRange();
            startRange.setStart(this.selectedRange.startContainer, this.selectedRange.startOffset);
            startRange.setEndAfter(startRangeParent.lastChild);

            // Create the style for the start range
            this.createStyle(startRange);


            // Create the end range
            let endRangeParent: HTMLElement = this.getParent(this.selectedRange.endContainer);
            let endRange: Range = document.createRange();
            endRange.setStart(endRangeParent, 0);
            endRange.setEnd(this.selectedRange.endContainer, this.selectedRange.endOffset);

            // Create the style for the end range
            this.createStyle(endRange);


            // Style all nodes between start & end range
            for (let i = 0; i < this.selectedRange.commonAncestorContainer.childNodes.length; i++) {
                let childNode = this.selectedRange.commonAncestorContainer.childNodes[i];

                // Make sure node is not start or end and is not a text node
                if (this.selectedRange.intersectsNode(childNode) &&
                    childNode != startRangeParent &&
                    childNode != endRangeParent &&
                    childNode.nodeType != 3) {


                    // Create the mid range
                    let midRange: Range = document.createRange();
                    midRange.setStart(childNode, 0);
                    midRange.setEndAfter(childNode.lastChild);

                    // Create the style for the mid range
                    this.createStyle(midRange);
                }
            }

            // Update the selection
            this.selectedRange.setStart(startRange.startContainer, startRange.startOffset);
            this.selectedRange.setEnd(endRange.endContainer, endRange.endOffset);
        }
    }


    getFirstTextChild(node: Node): Text {
        let child = node;

        for (let i = 0; i < node.childNodes.length; i++) {
            if (child.nodeType == 3) return child as Text;
            child = this.getFirstTextChild(node.childNodes[i]);
        }


        return child as Text;
    }

    getLastTextChild(node: Node): Text {
        let child = node;

        for (let i = 0; i < node.childNodes.length; i++) {
            child = this.getLastTextChild(node.childNodes[i])
        }

        return child as Text;
    }


    cleanUp(parent: HTMLElement) {
        let removed: boolean;

        for (let i = 0; i < parent.children.length; i++) {

            if (parent.children[i].getBoundingClientRect().width == 0) {
                parent.children[i].remove();
                i--;
                removed = true;
            }

            if (!removed) this.cleanUp(parent.children[i] as HTMLElement);
            removed = false;
        }
    }

    getStyleParent(node: Node): HTMLElement {
        let parent = this.getParent(node);
        while (node.parentElement.style[this.style] == '') {
            node = node.parentElement;
            if (node == parent) {
                node = null;
                break;
            }
        }
        return node as HTMLElement;
    }


    removeStyle(range: Range) {
        let startRange: Range = document.createRange();
        startRange.setStart(this.getStyleParent(range.startContainer).parentElement, 0);
        startRange.setEnd(range.startContainer, range.startOffset);


        let endRange: Range = document.createRange();
        endRange.setStart(range.endContainer, range.endOffset);
        endRange.setEndAfter(this.getStyleParent(range.endContainer).parentElement);


        startRange.insertNode(startRange.extractContents());
        endRange.insertNode(endRange.extractContents());


        // Update the selected range to include all parent nodes that contain the styles of the selection, but not the parent that contains the style we are removing
        range.setStartBefore(this.getStyleParent(range.startContainer));


        // Extract the contents from the selected range
        let selectedContents: DocumentFragment = range.extractContents();

        // The count of selected contents is used to update the selected range
        // let selectedContentsCount: number = selectedContents.childNodes.length;

        // Extract the contents from the selected range and place it before the End Range
        endRange.insertNode(selectedContents);

        // Remove any residual elements
        // this.cleanUp(this.getParent(range.startContainer));

        // // Update the selection
        // range.setStart(this.getFirstTextChild(endRange.startContainer.childNodes[endRange.startOffset]), 0);
        // let child: Text = this.getLastTextChild(endRange.startContainer.childNodes[endRange.startOffset + selectedContentsCount - 1]);
        // range.setEnd(child, child.length);
    }


    removeDuplicateStyle(element: HTMLElement) {
        for (let i = 0; i < element.childElementCount; i++) {
            let child = element.children[i] as HTMLElement;

            // If there is a child that contains the parent style
            if (child.style[this.style] != '') {
                let range: Range = document.createRange();
                let lastTextChild = this.getLastTextChild(child);

                // Set the range start and end
                range.setStart(this.getFirstTextChild(child), 0);
                range.setEnd(lastTextChild, lastTextChild.length);

                // Remove the duplicate style
                this.removeStyle(range);
            }

            this.removeDuplicateStyle(child);
        }
    }



    mergeTextNodes(element: HTMLElement) {
        for (let i = 0; i < element.childNodes.length - 1; i++) {
            let child: ChildNode = element.childNodes[i];

            if (child.nodeType == 3 && child.nextSibling.nodeType == 3) {
                let text: Text = child as Text;
                let textSibling: Text = child.nextSibling as Text;

                text.appendData(textSibling.data);
                textSibling.remove();
                i--;
            }
        }
    }


    selectionHasStyle(): boolean {
        if (this.selectedRange.startContainer === this.selectedRange.endContainer) {
            // Single container is selected
            return this.nodeHasStyle(this.selectedRange.startContainer.parentElement);
        } else {
            // Multiple containers are selected
            return this.multipleNodesHasStyle(this.contentDocument.body.firstElementChild);
        }
    }

    multipleNodesHasStyle(node: ChildNode): boolean {
        for (let i = 0; i < node.childNodes.length; i++) {
            let childNode = node.childNodes[i];

            if (childNode.nodeType == 3 && !childNode.nodeValue.match(/^\s+$/)) {
                if (childNode == this.selectedRange.startContainer || (this.selectedRange.intersectsNode(childNode))) {
                    if (!this.nodeHasStyle(childNode.parentElement)) return false;
                    if (childNode == this.selectedRange.endContainer) return true;
                }
            }

            let result = this.multipleNodesHasStyle(childNode);
            if (result == true || result == false) {
                return result;
            }
        }
    }

    nodeHasStyle(node: HTMLElement): boolean {
        return window.getComputedStyle(node)[this.style] == this.styleValue;
    }
}