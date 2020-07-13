import { ColorStyle } from './color-style';
import { Color } from './color';
import { Underline } from './underline';
import { Style } from './style';
import { Subject } from 'rxjs';

export class FontColor extends ColorStyle {

    constructor(contentDocument: HTMLDocument, defaultColor: Color, onChange: Subject<string>) {
        super(contentDocument, onChange);

        this.style = 'color';
        this.defaultColor = defaultColor;
    }


    setStyle(range: Range) {
        let parent = this.getSelectionParent(range.startContainer);
        let listItem = this.getListItem(range.startContainer);

        // If the whole text is selected and we are inside a list
        if (range.startOffset == 0 &&
            range.endOffset == (range.endContainer as Text).length &&
            this.getFirstTextChild(parent) == range.startContainer &&
            this.getLastTextChild(parent) == range.endContainer && listItem) {

            let colorNode = this.getStyleNode(range.startContainer, 'color');

            // Give the list item the color
            listItem.style[this.style] = this.styleValue;

            // We also need to color the div if not already
            if (colorNode && colorNode == listItem) {
                Style.prototype.setStyle.call(this, range);
            }
        }

        super.setStyle(range);
    }


    extractContents(range: Range): DocumentFragment {
        let underlineStyle = new Underline(this.contentDocument, null);
        let underlineParent = underlineStyle.getStyleParent(this.getFirstTextChild(range.startContainer));

        // If there is an underline parent, we have to include it within the contents
        if (underlineParent) {

            // Insert the selected range contents before the underline parent
            if (range.startOffset > 0) {
                let newRange = document.createRange();

                newRange.setStartBefore(underlineParent);
                newRange.setEnd(range.startContainer, range.startOffset);
                newRange.insertNode(newRange.extractContents());
            }

            // Include the underline and color contents
            range.setStartBefore(underlineParent);
            return range.extractContents();
        } else {
            return super.extractContents(range);
        }
    }

    getListItem(node: Node) {
        while (node.parentElement && node.parentElement.tagName != 'LI') {
            node = node.parentElement;
        }

        return node.parentElement as HTMLElement;
    }
}