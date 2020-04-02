import { Link } from './link';
import { NodeStyle } from './node-style';
import { LinkSource } from './link-source';

export class LinkStyle extends NodeStyle implements LinkSource {
    public link: Link = new Link();

    constructor(contentDocument: HTMLDocument) {
        super(contentDocument);

        this.style = 'A';
    }

    onSelectionChange(range: Range) {
        super.onSelectionChange(range);

        // Reset the link data
        this.resetLinkData();

        
        if (this.isSelected) {
            // Get the link data
            let link: Link = this.getLinkData(this.getAnchorNode(range));

            // Assign the link data
            this.link.selectedOption = link.selectedOption;
            this.link.url = link.url;
        } else if (range.collapsed || !this.isSingleLineSelection) {
            // If the range is collapsed or more than one line is selected, flag as disabled
            this.link.disabled = true;
        }

        // Flag that the link data has changed
        this.link.linkDataChanged = true;
    }

    applyLink() {
        this.applyStyle();

        this.onSelectionChange(this.selectedRange);
    }


    setStyle(range: Range) {
        let anchor: HTMLElement;
        
        if (!this.isSelected) {
            // Create the anchor node and append the contents
            anchor = document.createElement('A');
            anchor.appendChild(range.extractContents());
            range.insertNode(anchor);

            // Remove any duplicate styles within the contents
            this.removeDuplicateStyle(anchor);
        } else {
            // Get the anchor from the selection
            anchor = this.getAnchorNode(range);
        }

        // Assign the link data to the anchor
        this.setLinkData(anchor);

        // Update the selection
        this.selectedRange.setStart(this.getFirstTextChild(anchor), 0);
        let lastTextChild = this.getLastTextChild(anchor);
        this.selectedRange.setEnd(lastTextChild, lastTextChild.length);
    }

    getLinkData(node: HTMLElement): Link {
        let link = new Link();
        let data = JSON.parse(node.getAttribute('href'));

        // Assign the data and return the link object
        link.selectedOption = data.selectedOption;
        link.url = data.url;
        return link;
    }

    setLinkData(anchor: HTMLElement) {
        // Assign the data to the anchor node
        anchor.setAttribute('href', JSON.stringify({ selectedOption: this.link.selectedOption, url: this.link.url }));
        anchor.setAttribute('target', '_blank');
    }

    getAnchorNode(range: Range): HTMLElement {
        let node: HTMLElement = range.startContainer as HTMLElement;

        // Loop through each node until we find the anchor node
        while (node.tagName != 'A') {
            node = node.parentElement;
        }

        return node;
    }

    removeLink() {
        // Remove the anchor node
        this.removeStyle(this.selectedRange);

        // Reset the link data
        this.resetLinkData();

        // Update the selection
        let startNode = this.selectedRange.commonAncestorContainer.childNodes[this.selectedRange.startOffset];
        let endNode = this.selectedRange.commonAncestorContainer.childNodes[this.selectedRange.endOffset - 1];
        let lastTextChild = this.getLastTextChild(endNode);
        this.selectedRange.setStart(this.getFirstTextChild(startNode), 0);
        this.selectedRange.setEnd(lastTextChild, lastTextChild.length);

        
        this.onSelectionChange(this.selectedRange);

        // Set the focus
        this.setFocus();
    }

    removeStyle(range) {
        let anchor = this.getAnchorNode(range);

        // Set the range to include all the contents within the anchor node
        range.setStartBefore(anchor.firstChild);
        let lastTextChild = this.getLastTextChild(anchor);
        range.setEnd(lastTextChild, lastTextChild.length);

        // Extract the contents
        let contents = range.extractContents();

        // Remove the anchor node
        anchor.remove();

        // Put the contents back
        range.insertNode(contents);
    }

    resetLinkData() {
        this.link.url = '';
        this.link.selectedOption = '';
        this.link.disabled = false;
    }
}