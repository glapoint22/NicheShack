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
        let span = document.createElement("span");

        // Apply the style
        span.style[this.style] = this.styleValue;

        // Place the contents inside the span
        span.appendChild(range.extractContents());

        // Remove any duplicate styles within the contents
        this.removeDuplicateStyle(span);

        // Insert the contents at the start of the range
        range.insertNode(span);

        // Remove any empty or blank text nodes that may have been generated
        this.removeEmptyNodes(this.getParent(range.startContainer));

        // Update the selection
        range.setStart(this.getFirstTextChild(span), 0);
        let lastTextChild = this.getLastTextChild(span);
        range.setEnd(lastTextChild, lastTextChild.length);
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
            let lastChild = this.getLastTextChild(startRangeParent.lastChild);
            startRange.setEnd(lastChild, lastChild.length);

            // Create the style for the start range
            this.createStyle(startRange);


            // Create the end range
            let endRangeParent: HTMLElement = this.getParent(this.selectedRange.endContainer);
            let endRange: Range = document.createRange();
            endRange.setStart(this.getFirstTextChild(endRangeParent.firstChild), 0);
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
                    midRange.setStart(this.getFirstTextChild(childNode.firstChild), 0);
                    let lastChild = this.getLastTextChild(childNode.lastChild);
                    midRange.setEnd(lastChild, lastChild.length);

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






    getStyleParent(node: Node): HTMLElement {
        while (node.parentElement != null && node.parentElement.style[this.style] == '') {
            node = node.parentElement;
        }
        return node.parentElement;
    }




    removeStyle(selectedRange: Range) {
        let styleParent: HTMLElement = this.getStyleParent(selectedRange.startContainer);
        let startText = this.getFirstTextChild(styleParent);
        let endText = this.getLastTextChild(styleParent);

        let whole: boolean = selectedRange.comparePoint(startText, 0) == 0 && selectedRange.comparePoint(endText, endText.length) == 0;
        let mid: boolean = selectedRange.comparePoint(startText, 0) == -1 && selectedRange.comparePoint(endText, endText.length) == 1;
        let end: boolean = selectedRange.comparePoint(startText, 0) == -1 && selectedRange.comparePoint(endText, endText.length) == 0;

        // If middle or end of the container is selected
        if (mid || end) {
            let startRange: Range = document.createRange();

            // Insert the contents that is before the selected range into a start range
            startRange.setStartBefore(styleParent);
            startRange.setEnd(selectedRange.startContainer, selectedRange.startOffset);
            startRange.insertNode(startRange.extractContents());
        }

        // Insert the selected range contents before the style parent
        selectedRange.setStart(styleParent, 0);
        let selectedContents: DocumentFragment = selectedRange.extractContents();
        let selectedContentsCount: number = selectedContents.childNodes.length;
        styleParent.parentElement.insertBefore(selectedContents, styleParent);

        // Update the selection
        let index = Array.from(styleParent.parentElement.childNodes).indexOf(styleParent);
        let lastTextChild: Text = this.getLastTextChild(styleParent.previousSibling);

        selectedRange.setStart(this.getFirstTextChild(styleParent.parentElement.childNodes[index - selectedContentsCount]), 0);
        selectedRange.setEnd(lastTextChild, lastTextChild.length);

        // Remove the style parent contents
        if (whole || end) styleParent.remove();
    }






    removeEmptyNodes(parent: HTMLElement) {
        for (let i = 0; i < parent.childNodes.length; i++) {
            let childNode: ChildNode = parent.childNodes[i];

            if ((childNode.nodeType == 1 &&
                (childNode as HTMLElement).getBoundingClientRect().width == 0) ||
                (childNode.nodeType == 3 && childNode.nodeValue.length == 0)) {
                childNode.remove();
                i--;
                continue;
            }

            this.removeEmptyNodes(childNode as HTMLElement);
        }
    }



    removeDuplicateStyle(element: HTMLElement) {
        for (let i = 0; i < element.childElementCount; i++) {
            let child: HTMLElement = element.children[i] as HTMLElement;

            // If there is a child that contains the parent style
            if (child.style[this.style] != '') {
                let range: Range = document.createRange();
                let lastTextChild: Text = this.getLastTextChild(child);

                // Set the range start and end
                range.setStart(this.getFirstTextChild(child), 0);
                range.setEnd(lastTextChild, lastTextChild.length);

                // Remove the duplicate style
                this.removeStyle(range);
            }

            this.removeDuplicateStyle(child);
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

            if (childNode.nodeType == 3) {
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

    nodeHasStyleAlt(node: HTMLElement): boolean {
        // This method is used when nodeHasStyle cannot be used (style is not inherited eg. background color and underline)
        while (node != this.contentDocument.body.firstElementChild) {
            
            // If this style is applied
            if(node.style[this.style] != '') {
                // If the style value applied does not equal this style value, return false
                if(node.style[this.style] != this.styleValue) return false;

                return true;
            } 

            node = node.parentElement;
        }

        return false;
    }

    setFocus() {
        let content: HTMLElement = this.contentDocument.body.firstElementChild as HTMLElement;
        
        content.focus();
    }
}