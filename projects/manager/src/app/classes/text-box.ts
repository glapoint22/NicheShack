import { Bold } from './bold';
import { Italic } from './italic';
import { ApplicationRef } from '@angular/core';
import { Style } from './style';
import { Underline } from './underline';
import { Font } from './font';
import { FontSize } from './font-size';
import { FontColor } from './font-color';
import { HighlightColor } from './highlight-color';

export class TextBox {
    public bold: Bold;
    public italic: Italic;
    public underline: Underline;
    public font: Font;
    public fontSize: FontSize;
    public fontColor: FontColor;
    public highlightColor: HighlightColor;

    constructor(private contentDocument: HTMLDocument, applicationRef: ApplicationRef) {
        // Styles
        this.bold = new Bold(contentDocument);
        this.italic = new Italic(contentDocument);
        this.underline = new Underline(contentDocument);
        this.font = new Font(contentDocument);
        this.fontSize = new FontSize(contentDocument);
        this.fontColor = new FontColor(contentDocument);
        this.highlightColor = new HighlightColor(contentDocument);

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
        content.style.fontSize = '14px';
        content.innerHTML = '<div>This is a temporary paragraph. Double click to edit this text.</div>';
    }

    selectContents() {
        let style = new Style(this.contentDocument);
        let firstTextChild = style.getFirstTextChild(this.contentDocument.body.firstChild);
        let lastTextChild = style.getLastTextChild(this.contentDocument.body.lastChild);
        let sel = this.contentDocument.getSelection();
        let range = document.createRange();
        let content: HTMLElement = this.contentDocument.body.firstElementChild as HTMLElement;

        // Set the start and end of the range
        range.setStart(firstTextChild, 0);
        range.setEnd(lastTextChild, lastTextChild.length);

        // Select the range
        sel.removeAllRanges();
        sel.addRange(range);

        // Give focus
        content.focus();

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