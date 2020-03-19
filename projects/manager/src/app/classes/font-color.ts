import { ColorStyle } from './color-style';
import { Color } from './color';
import { Underline } from './underline';

export class FontColor extends ColorStyle {

    constructor(contentDocument: HTMLDocument, defaultColor: Color) {
        super(contentDocument);

        this.style = 'color';
        this.defaultColor = defaultColor;
    }


    extractContents(range: Range): DocumentFragment {
        let underlineStyle = new Underline(this.contentDocument);
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
}