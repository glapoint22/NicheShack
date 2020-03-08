export class Style {
    public style: string;
    public styleValue: string;
    public selectedRange: Range;
    public get isSingleLineSelection(): boolean {
        return this.selectedRange.commonAncestorContainer != this.contentParentNode &&
            (this.selectedRange.commonAncestorContainer as HTMLElement).tagName != 'OL' &&
            (this.selectedRange.commonAncestorContainer as HTMLElement).tagName != 'UL';
    }
    public contentParentNode: HTMLElement;


    constructor(public contentDocument: HTMLDocument) {
        this.contentParentNode = contentDocument.body.firstElementChild as HTMLElement;
    }

    onSelectionChange(range: Range) {
        this.selectedRange = range;
    }


    setStyle(range: Range) {
        let isStartContainer: boolean = range.startContainer == this.selectedRange.startContainer;
        let isEndContainer: boolean = range.endContainer == this.selectedRange.endContainer;
        let span = document.createElement("span");

        // Apply the style
        span.style[this.style] = this.styleValue;

        // Place the contents inside the span
        span.appendChild(range.extractContents());

        // Remove any duplicate styles within the contents
        this.removeDuplicateStyle(span);

        // Insert the contents at the start of the range
        range.insertNode(span);

        // Update the selection if we are at the start of the range
        if (isStartContainer) {
            this.selectedRange.setStart(this.getFirstTextChild(span), 0);
        }

        // Update the selection if we are at the end of the range
        if (isEndContainer) {
            let lastTextChild = this.getLastTextChild(span);
            this.selectedRange.setEnd(lastTextChild, lastTextChild.length);
        }
    }



    getSelectionParent(node: Node): HTMLElement {
        while (node.parentElement != this.contentParentNode && node.parentElement.tagName != 'LI') {
            node = node.parentElement;
        }
        return node as HTMLElement;
    }



    applyStyle() {
        // If the style is being applied on a single line
        if (this.isSingleLineSelection) {
            this.setStyle(this.selectedRange);
        } else {
            this.setMultilineStyle(this.selectedRange.commonAncestorContainer as HTMLElement);
        }

        this.cleanUpStyle();
    }


    cleanUpStyle() {
        // Remove any empty or blank text nodes that may have been generated
        this.removeEmptyNodes(this.contentParentNode as HTMLElement);

        // Set the focus back to the text
        this.setFocus();
    }


    setMultilineStyle(parent: HTMLElement) {
        let childNodes = Array.from(parent.childNodes);

        childNodes.forEach((currentNode: HTMLElement) => {

            // Test to see if the current node is in the selected range
            if (this.selectedRange.intersectsNode(currentNode)) {

                if (currentNode.tagName == 'UL' || currentNode.tagName == 'OL') {
                    this.setMultilineStyle(currentNode);
                } else {
                    // Set the style for the current node
                    this.setStyle(this.createRange(currentNode));
                }

                // If the current node is beyond the selected range, return
            }
            else if (this.selectedRange.comparePoint(currentNode, 0) == 1) {
                return;
            }
        });
    }


    createRange(node: HTMLElement): Range {
        let range: Range = document.createRange();
        let startNode: Node;
        let startOffset: number;
        let endNode: Node;
        let endOffset: number;

        if (node.tagName == 'LI') node = node.firstElementChild as HTMLElement;

        if (node == this.getSelectionParent(this.selectedRange.startContainer)) {
            startNode = this.selectedRange.startContainer;
            startOffset = this.selectedRange.startOffset;
            endNode = this.getLastTextChild(node.lastChild);
            endOffset = (endNode as Text).length;
        } else if (node == this.getSelectionParent(this.selectedRange.endContainer)) {
            startNode = this.getFirstTextChild(node.firstChild)
            startOffset = 0;
            endNode = this.selectedRange.endContainer;
            endOffset = this.selectedRange.endOffset;
        } else {
            startNode = this.getFirstTextChild(node.firstChild);
            startOffset = 0
            endNode = this.getLastTextChild(node.lastChild);
            endOffset = (endNode as Text).length;
        }

        range.setStart(startNode, startOffset);
        range.setEnd(endNode, endOffset);

        return range;
    }


    getFirstTextChild(node: Node): Text {
        let text: Text;

        for (let i = 0; i < node.childNodes.length; i++) {
            let child: ChildNode = node.childNodes[i];

            if (child.nodeType == 3) return child as Text;
            text = this.getFirstTextChild(child);
            if (text && text.nodeType == 3) return text;
        }

        return text;
    }

    getLastTextChild(node: Node, text?: Text | ChildNode): Text {
        for (let i = 0; i < node.childNodes.length; i++) {
            let child: ChildNode = node.childNodes[i];

            if (child.nodeType == 3) text = child;
            text = this.getLastTextChild(child, text);
        }

        return text as Text;
    }






    getStyleParent(node: Node): HTMLElement {
        while (node.parentElement != null && node.parentElement.style[this.style] == '') {
            node = node.parentElement;
        }
        return node.parentElement;
    }




    removeStyle(range: Range) {
        let isStartContainer: boolean = range.startContainer == this.selectedRange.startContainer;
        let isEndContainer: boolean = range.endContainer == this.selectedRange.endContainer;
        let styleParent: HTMLElement = this.getStyleParent(range.startContainer);
        let startText = this.getFirstTextChild(styleParent);
        let endText = this.getLastTextChild(styleParent);

        let whole: boolean = range.comparePoint(startText, 0) == 0 && range.comparePoint(endText, endText.length) == 0;
        let mid: boolean = range.comparePoint(startText, 0) == -1 && range.comparePoint(endText, endText.length) == 1;
        let end: boolean = range.comparePoint(startText, 0) == -1 && range.comparePoint(endText, endText.length) == 0;

        // If middle or end of the container is selected
        if (mid || end) {
            let startRange: Range = document.createRange();

            // Insert the contents that is before the selected range into a start range
            startRange.setStartBefore(styleParent);
            startRange.setEnd(range.startContainer, range.startOffset);
            startRange.insertNode(startRange.extractContents());
        }

        // Insert the selected range contents before the style parent
        range.setStart(styleParent, 0);
        let selectedContents: DocumentFragment = range.extractContents();
        let selectedContentsCount: number = selectedContents.childNodes.length;
        styleParent.parentElement.insertBefore(selectedContents, styleParent);

        // Update the selection if we are at the start of the range
        if (isStartContainer) {
            let index = Array.from(styleParent.parentElement.childNodes).indexOf(styleParent);
            this.selectedRange.setStart(this.getFirstTextChild(styleParent.parentElement.childNodes[index - selectedContentsCount]), 0);
        }

        // Update the selection if we are at the end of the range
        if (isEndContainer) {
            let lastTextChild: Text = this.getLastTextChild(styleParent.previousSibling);
            this.selectedRange.setEnd(lastTextChild, lastTextChild.length);
        }


        // Remove the style parent contents
        if (whole || end) styleParent.remove();
    }






    removeEmptyNodes(parent: HTMLElement) {
        for (let i = 0; i < parent.childNodes.length; i++) {
            let childNode: ChildNode = parent.childNodes[i];

            if ((childNode.nodeType == 1 &&
                ((childNode as HTMLElement).getBoundingClientRect().width == 0 || (childNode as HTMLElement).getBoundingClientRect().height == 0)) ||
                (childNode.nodeType == 3 && childNode.nodeValue.length == 0)) {
                childNode.remove();
                i--;
                continue;
            }

            this.removeEmptyNodes(childNode as HTMLElement);

            if (childNode.nodeType == 1 && childNode.childNodes.length == 0) {
                childNode.remove();
                i--;
            }
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
        if (this.selectedRange.startContainer == this.selectedRange.endContainer) {
            // Single container is selected
            return this.nodeHasStyle(this.selectedRange.startContainer.parentElement);
        } else {
            // Multiple containers are selected
            return this.multipleNodesHasStyle(this.contentParentNode);
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
        while (node != this.contentParentNode) {

            // If this style is applied
            if (node.style[this.style] != '') {
                // If the style value applied does not equal this style value, return false
                if (node.style[this.style] != this.styleValue) return false;

                return true;
            }

            node = node.parentElement;
        }

        return false;
    }


    setFocus() {
        let content: HTMLElement = this.contentParentNode as HTMLElement;
        content.focus();
    }
}