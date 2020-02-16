import { Bold } from './bold';
import { Italic } from './italic';
import { ApplicationRef } from '@angular/core';
import { Style } from './style';
import { Underline } from './underline';
import { Font } from './font';

export class TextBox {
    public bold: Bold;
    public italic: Italic;
    public underline: Underline;
    public font: Font;

    constructor(private contentDocument: HTMLDocument, applicationRef: ApplicationRef) {
        // Styles
        this.bold = new Bold(contentDocument);
        this.italic = new Italic(contentDocument);
        this.underline = new Underline(contentDocument);
        this.font = new Font(contentDocument);

        // Process change detection
        contentDocument.addEventListener("mouseup", () => applicationRef.tick());
        contentDocument.body.tabIndex = 0;

        let content: HTMLElement = contentDocument.body.firstElementChild as HTMLElement;
        content.contentEditable = 'true';
        content.style.position = 'absolute';
        content.style.top = '0';
        content.style.right = '0';
        content.style.bottom = '0';
        content.style.left = '0';
        content.style.outline = "none";
        content.style.fontFamily = 'Arial, Helvetica, sans-serif';
        content.innerHTML = '<div>This is a temporary paragraph. Click here to add your own text.</div>';
    }

    selectContents() {
        let style = new Style(this.contentDocument);
        let firstTextChild = style.getFirstTextChild(this.contentDocument.body.firstChild);
        let lastTextChild = style.getLastTextChild(this.contentDocument.body.lastChild);
        let sel = this.contentDocument.getSelection();
        let range = document.createRange();

        // Set the start and end of the range
        range.setStart(firstTextChild, 0);
        range.setEnd(lastTextChild, lastTextChild.length);

        // Select the range
        sel.removeAllRanges();
        sel.addRange(range);

        // Give focus
        this.contentDocument.body.focus();

        // Check to see if each style is applied in the selection
        let keys = Object.keys(this);
        keys.forEach((key: string) => {
            if (this[key].style) {
                this[key].selectedRange = range;
                this[key].isSelected = this[key].checkSelection();
            }
        });
    }
}