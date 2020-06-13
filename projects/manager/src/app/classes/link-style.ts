import { Link, LinkOption } from './link';
import { NodeStyle } from './node-style';
import { LinkPopupComponent } from '../shared-components/popups/link-popup/link-popup.component';
import { Subscription, Subject } from 'rxjs';

export class LinkStyle extends NodeStyle {
    public link: Link = new Link();
    private linkPopupSubscription: Subscription;

    // linkPopup reference
    public set linkPopup(linkPopup: LinkPopupComponent) {
        // If we already have a subscription, unsub
        if (this.linkPopupSubscription) this.linkPopupSubscription.unsubscribe();

        // Subscribe when the popup closes
        this.linkPopupSubscription = linkPopup.onPopupClose.subscribe(() => {
            let linkData: Link = new Link();

            // Get the link data
            if (this.isSelected) {
                linkData = this.getLinkData(this.getAnchorNode(this.selectedRange));
            }


            // Decide if we apply the link data or remove the link data
            if (this.link.url && this.link.selectedOption != LinkOption.None && (this.link.selectedOption != linkData.selectedOption || this.link.url != linkData.url)) {
                this.applyStyle();
            } else if (this.link.selectedOption == LinkOption.None && this.isSelected) {
                this.removeLink();
            }

            // Set the focus back to the text
            this.setFocus();
        });
    }

    constructor(contentDocument: HTMLDocument, onChange: Subject<void>) {
        super(contentDocument, onChange);

        this.style = 'A';
    }




    // ----------------------------------------------------------------- On Link Popup Open --------------------------------------------------------------
    onLinkPopupOpen() {
        this.link.disabled = false;

        // If we already have link data
        if (this.isSelected) {
            let anchor = this.getAnchorNode(this.selectedRange);

            // Update the selection to select all of the link text if it isn't already
            this.updateSelection(anchor);

        } else {
            // If the selection is collapsed, flag to disable the link popup
            if (this.selectedRange.collapsed || !this.isSingleLineSelection) {
                this.link.disabled = true;
            }
        }

    }








    // -------------------------------------------------------------------- Update Selection --------------------------------------------------------------
    updateSelection(anchor: HTMLElement) {
        this.selectedRange.setStart(this.getFirstTextChild(anchor), 0);
        let lastTextChild = this.getLastTextChild(anchor);
        this.selectedRange.setEnd(lastTextChild, lastTextChild.length);
    }









    // -------------------------------------------------------------------- On Selection Change ------------------------------------------------------------
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
        }
    }










    // -------------------------------------------------------------------------- Set Style -----------------------------------------------------------------
    setStyle(range: Range) {
        let anchor: HTMLElement;

        if (!this.isSelected) {
            // Create the anchor node and append the contents
            anchor = document.createElement('A');
            anchor.appendChild(range.extractContents());
            range.insertNode(anchor);

            // Remove any duplicate styles within the contents
            this.removeDuplicateStyle(anchor);

            this.isSelected = true;

        }
        else {
            // Get the anchor from the selection
            anchor = this.getAnchorNode(range);
        }

        // Assign the link data to the anchor
        this.setLinkData(anchor);

        this.updateSelection(anchor);
    }








    // --------------------------------------------------------------------------- Get Link Data -------------------------------------------------------------
    getLinkData(node: HTMLElement): Link {
        let link = new Link();
        let data = JSON.parse(node.getAttribute('href'));

        // Assign the data and return the link object
        link.selectedOption = data.selectedOption;
        link.url = data.url;
        return link;
    }











    // --------------------------------------------------------------------------- Set Link Data -------------------------------------------------------------
    setLinkData(anchor: HTMLElement) {
        // Assign the data to the anchor node
        anchor.setAttribute('href', JSON.stringify({ selectedOption: this.link.selectedOption, url: this.link.url }));
        anchor.setAttribute('target', '_blank');
    }













    // ---------------------------------------------------------------------------- Get Anchor Node -----------------------------------------------------------
    getAnchorNode(range: Range): HTMLElement {
        let node: HTMLElement = range.startContainer as HTMLElement;

        // Loop through each node until we find the anchor node
        while (node.tagName != 'A') {
            node = node.parentElement;
        }

        return node;
    }








    // ------------------------------------------------------------------------------- Remove Link ----------------------------------------------------------
    removeLink() {
        // Remove the anchor node
        this.removeStyle(this.selectedRange);


        // Update the selection
        let startNode = this.selectedRange.commonAncestorContainer.childNodes[this.selectedRange.startOffset];
        let endNode = this.selectedRange.commonAncestorContainer.childNodes[this.selectedRange.endOffset - 1];
        let lastTextChild = this.getLastTextChild(endNode);
        this.selectedRange.setStart(this.getFirstTextChild(startNode), 0);
        this.selectedRange.setEnd(lastTextChild, lastTextChild.length);

        // Flag that this style is not selected
        this.isSelected = false;
    }












    // ------------------------------------------------------------------------------- Remove Style ----------------------------------------------------------
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








    // ------------------------------------------------------------------------------- Reset Link Data --------------------------------------------------------
    resetLinkData() {
        this.link.url = '';
        this.link.selectedOption = LinkOption.None;
    }










    // -------------------------------------------------------------------------------- Finalize Style ---------------------------------------------------------
    finalizeStyle() {
        // Remove any empty or blank text nodes that may have been generated
        this.removeEmptyNodes(this.contentParentNode as HTMLElement);
    }
}