import { Selection } from './selection';

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
        let collapsed: boolean = range.collapsed;
        let span = document.createElement("span");

        // Apply the style
        span.style[this.style] = this.styleValue;

        if (range.collapsed) {
            // if (range.startContainer.nodeType == 3) {
            let text: Text = range.startContainer as Text;

            if ((text.data.length == 1 && text.data.charCodeAt(0) == 8203)) {
                text.remove();
            }
            // }

            span.appendChild(document.createTextNode('\u200B'));
        } else {
            // Place the contents inside the span
            span.appendChild(range.extractContents());
        }



        // Remove any duplicate styles within the contents
        this.removeDuplicateStyle(span);

        // Insert the contents at the start of the range
        range.insertNode(span);


        // Update the selection if we are at the start of the range
        if (isStartContainer) {
            let firstTextChild = this.getFirstTextChild(span);

            if (firstTextChild) this.selectedRange.setStart(firstTextChild, 0);
        }

        // Update the selection if we are at the end of the range
        if (isEndContainer) {
            let lastTextChild = this.getLastTextChild(span);

            if (lastTextChild) this.selectedRange.setEnd(lastTextChild, lastTextChild.length);
        }

        if (collapsed) range.collapse();
    }



    removeStyle(range: Range) {
        let isStartContainer: boolean = range.startContainer == this.selectedRange.startContainer;
        let isEndContainer: boolean = range.endContainer == this.selectedRange.endContainer;
        let styleParent: HTMLElement = this.getStyleParent(range.startContainer);
        let startText = this.getFirstTextChild(styleParent);
        let endText = this.getLastTextChild(styleParent);
        let selectedContents: DocumentFragment;
        let collapsed = range.collapsed;

        let whole: boolean = range.comparePoint(startText, 0) == 0 && range.comparePoint(endText, endText.length) == 0;
        let mid: boolean = range.comparePoint(startText, 0) == -1 && range.comparePoint(endText, endText.length) == 1;
        let end: boolean = range.comparePoint(startText, 0) == -1 && range.comparePoint(endText, endText.length) == 0;

        // If middle or end of the container is selected
        if (mid || end) {
            let startRange: Range = document.createRange();

            // Insert the contents that is before the selected range into a start range
            startRange.setStartBefore(styleParent);
            startRange.setEnd(range.startContainer, range.startOffset);
            if (collapsed && (startRange.endContainer as Text).length == 1 && (startRange.endContainer as Text).data.charCodeAt(0) == 8203) {
                startRange.deleteContents();
            } else {
                startRange.insertNode(startRange.extractContents());
            }
        }

        if (collapsed) {
            range.insertNode(document.createTextNode('\u200B'));
        }

        // Insert the selected range contents before the style parent
        range.setStart(styleParent, 0);

        selectedContents = range.extractContents();



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

        if (collapsed) range.collapse();
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

        this.finalizeStyle();
    }


    finalizeStyle() {
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
            } else if (this.selectedRange.comparePoint(currentNode, 0) == 1) {
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

        if (node.nodeType == 3) return node as Text;

        for (let i = 0; i < node.childNodes.length; i++) {
            let child: ChildNode = node.childNodes[i];

            if (child.nodeType == 3) return child as Text;
            text = this.getFirstTextChild(child);
            if (text && text.nodeType == 3) return text;
        }

        return text;
    }

    getLastTextChild(node: Node, text?: Text | ChildNode): Text {
        if (node.nodeType == 3) return node as Text;

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




    removeEmptyNodes(parent: HTMLElement) {
        for (let i = 0; i < parent.childNodes.length; i++) {
            let currentNode: ChildNode = parent.childNodes[i];

            if (currentNode.nodeType == 3) {
                if (currentNode.nodeValue.length == 0) {
                    currentNode.remove();
                    i--;
                }
            }

            this.removeEmptyNodes(currentNode as HTMLElement);

            if (currentNode.nodeType == 1 && currentNode.childNodes.length == 0) {
                currentNode.remove();
                i--;
            }
        }
    }



    removeDuplicateStyle(element: HTMLElement) {
        for (let i = 0; i < element.childElementCount; i++) {
            let child: HTMLElement = element.children[i] as HTMLElement;

            // If there is a child that contains the parent style
            if (this.hasStyle(child)) {
                let range: Range = document.createRange();
                let lastTextChild: Text = this.getLastTextChild(child);

                // Set the range start and end
                range.setStart(this.getFirstTextChild(child), 0);
                range.setEnd(lastTextChild, lastTextChild.length);

                // Remove the duplicate style
                this.removeStyle(range);
                i--;
                continue;
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
            if (this.hasStyle(node)) {
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

    hasStyle(element: HTMLElement): boolean {
        return element.style[this.style] != '';
    }

    getSelection(): Selection {
        let selection = new Selection();
        let range = this.selectedRange.cloneRange();
        let startParent: HTMLElement = this.getSelectionParent(this.selectedRange.startContainer);
        let endParent: HTMLElement = this.getSelectionParent(this.selectedRange.endContainer);

        // if (startParent.firstChild.nodeType == 1 && (startParent.firstChild as HTMLElement).tagName == 'BR') {
        //     startParent.firstChild.replaceWith(document.createTextNode('\u200B'));
        //     range.setStart(startParent.firstChild, 0);
        // }

        // if (endParent.firstChild.nodeType == 1 && (endParent.firstChild as HTMLElement).tagName == 'BR') {
        //     endParent.firstChild.replaceWith(document.createTextNode('\u200B'));
        //     range.setEnd(endParent.firstChild, (endParent.firstChild as Text).length);
        // }

        // Get the start and end of the range
        selection.startOffset = this.selectedRange.startOffset;
        selection.endOffset = this.selectedRange.endOffset;


        // Getting an array of offsets will be used to set the selection
        while (range.startContainer != startParent) {
            range.setStartBefore(range.startContainer);
            selection.startOffsets.unshift(range.startOffset);
        }


        while (range.endContainer != endParent) {
            range.setEndBefore(range.endContainer);
            selection.endOffsets.unshift(range.endOffset);
        }


        // Set the start and end markers
        startParent.setAttribute('start', '');
        endParent.setAttribute('end', '');


        return selection;
    }

    setSelection(selection: Selection) {
        // let text: Text;
        let parent: HTMLElement;

        // Remove the end attribute and get the node the attribute was on
        parent = this.removeSelectAttribute(this.contentParentNode as HTMLElement, 'end');

        // Set the end of the range
        this.selectedRange.setEnd(parent, 0);

        // Loop through the array of end offsets to get to the end node
        for (let i = 0; i < selection.endOffsets.length; i++) {
            this.selectedRange.setEnd(this.selectedRange.endContainer.childNodes[selection.endOffsets[i]], 0);
        }

        this.selectedRange.setEnd(this.selectedRange.endContainer, selection.endOffset);

        // Remove the start attribute and get the node the attribute was on
        parent = this.removeSelectAttribute(this.contentParentNode as HTMLElement, 'start');

        // Set the start of the range
        this.selectedRange.setStart(parent, 0);


        // Loop through the array of start offsets to get to the start node
        for (let i = 0; i < selection.startOffsets.length; i++) {
            this.selectedRange.setStart(this.selectedRange.startContainer.childNodes[selection.startOffsets[i]], 0);
        }

        this.selectedRange.setStart(this.selectedRange.startContainer, selection.startOffset);
    }

    removeSelectAttribute(node: HTMLElement, attribute: string) {
        for (let i = 0; i < node.childElementCount; i++) {
            let childNode = node.children[i] as HTMLElement;

            if (childNode.attributes[attribute] != null) {
                childNode.removeAttribute(attribute);
                return childNode;
            }

            let result = this.removeSelectAttribute(childNode, attribute);

            if (result) return result;
        }
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

}