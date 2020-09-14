import { Link } from './link';
import { NodeStyle } from './node-style';
import { LinkPopupComponent } from '../shared-components/popups/link-popup/link-popup.component';
import { Subscription, Subject } from 'rxjs';
import { LinkOption } from 'classes/link-base';

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
            let anchor: HTMLElement;

            // Get the link data
            if (this.isSelected) {
                anchor = this.getAnchorNode(this.selectedRange);
                if (anchor) linkData = this.getLinkData(anchor);
            }


            // Decide if we apply the link data or remove the link data
            if (this.link.url && this.link.selectedOption != LinkOption.None && (this.link.selectedOption != linkData.selectedOption || this.link.url != linkData.url)) {
                this.applyStyle();
            } else if (this.link.selectedOption == LinkOption.None && anchor) {
                this.removeLink();
            } else {
                if (linkData.url) {
                    this.link = linkData;
                } else {
                    this.link.selectedOption = LinkOption.None;
                }
            }


            // Set the focus back to the text
            this.setFocus();
        });
    }

    constructor(contentDocument: HTMLDocument, onChange: Subject<string>) {
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
            if (anchor) this.updateSelection(anchor);
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
            let anchor = this.getAnchorNode(range);

            if (anchor) {
                let link: Link = this.getLinkData(anchor);

                // Assign the link data
                this.link.selectedOption = link.selectedOption;
                this.link.url = link.url;
                this.link.optionValue = link.optionValue;
            }
        }
    }










    // -------------------------------------------------------------------------- Set Style -----------------------------------------------------------------
    setStyle(range: Range) {
        let anchor: HTMLElement = this.getAnchorNode(range);;

        if (!anchor) {
            // Create the anchor node and append the contents
            anchor = document.createElement('A');
            anchor.appendChild(range.extractContents());
            range.insertNode(anchor);

            // Remove any duplicate styles within the contents
            this.removeDuplicateStyle(anchor);

            this.isSelected = true;

        }


        this.setLinkData(anchor);
        this.updateSelection(anchor);
    }








    // --------------------------------------------------------------------------- Get Link Data -------------------------------------------------------------
    getLinkData(node: HTMLElement): Link {
        let link = new Link();

        // Assign the data and return the link object
        link.selectedOption = Number(node.getAttribute('option')) as LinkOption;
        link.url = node.getAttribute('href');
        link.optionValue = node.getAttribute('optionvalue');
        return link;
    }











    // --------------------------------------------------------------------------- Set Link Data -------------------------------------------------------------
    setLinkData(anchor: HTMLElement) {
        // Assign the data to the anchor node
        anchor.setAttribute('href', this.link.url);
        anchor.setAttribute('target', '_blank');
        anchor.setAttribute('option', this.link.selectedOption.toString());
        anchor.setAttribute('optionValue', this.link.optionValue);
    }













    // ---------------------------------------------------------------------------- Get Anchor Node -----------------------------------------------------------
    getAnchorNode(range: Range): HTMLElement {
        let node: HTMLElement = range.startContainer as HTMLElement;

        // Loop through each node until we find the anchor node
        while (node && node.tagName != 'A') {
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
        // this.isSelected = false;

        this.onChange.next(this.contentDocument.body.firstElementChild.innerHTML);
    }












    // ------------------------------------------------------------------------------- Remove Style ----------------------------------------------------------
    removeStyle(range) {
        let anchor = this.getAnchorNode(range);

        if (anchor) {
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
    }








    // ------------------------------------------------------------------------------- Reset Link Data --------------------------------------------------------
    resetLinkData() {
        this.link.url = '';
        this.link.selectedOption = LinkOption.None;
        this.link.optionValue = '';
    }










    // -------------------------------------------------------------------------------- Finalize Style ---------------------------------------------------------
    finalizeStyle() {
        // Remove any empty or blank text nodes that may have been generated
        this.removeEmptyNodes(this.contentParentNode as HTMLElement);
    }
}