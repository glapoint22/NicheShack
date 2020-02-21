import { Bold } from './bold';
import { Italic } from './italic';
import { ApplicationRef } from '@angular/core';
import { Style } from './style';
import { Underline } from './underline';
import { Font } from './font';
import { FontSize } from './font-size';
import { FontColor } from './font-color';
import { HighlightColor } from './highlight-color';
import { AlignCenter } from './align-center';
import { AlignLeft } from './align-left';
import { AlignRight } from './align-right';
import { AlignJustify } from './align-justify';
import { IncreaseIndent } from './increase-indent';
import { DecreaseIndent } from './decrease-indent';
import { fromEvent, merge, concat, combineLatest } from 'rxjs';
import { concatMap, switchMap } from 'rxjs/operators';

export class TextBox {
    public bold: Bold;
    public italic: Italic;
    public underline: Underline;
    public font: Font;
    public fontSize: FontSize;
    public fontColor: FontColor;
    public highlightColor: HighlightColor;
    public alignLeft: AlignLeft;
    public alignCenter: AlignCenter;
    public alignRight: AlignRight;
    public alignJustify: AlignJustify;
    public increaseIndent: IncreaseIndent;
    public decreaseIndent: DecreaseIndent;

    constructor(private contentDocument: HTMLDocument, applicationRef: ApplicationRef) {
        // Styles
        this.bold = new Bold(contentDocument);
        this.italic = new Italic(contentDocument);
        this.underline = new Underline(contentDocument);
        this.font = new Font(contentDocument);
        this.fontSize = new FontSize(contentDocument);
        this.fontColor = new FontColor(contentDocument);
        this.highlightColor = new HighlightColor(contentDocument);
        this.alignLeft = new AlignLeft(contentDocument);
        this.alignCenter = new AlignCenter(contentDocument);
        this.alignRight = new AlignRight(contentDocument);
        this.alignJustify = new AlignJustify(contentDocument);
        this.increaseIndent = new IncreaseIndent(contentDocument);
        this.decreaseIndent = new DecreaseIndent(contentDocument);



        // Content
        let content: HTMLElement = contentDocument.body.firstElementChild as HTMLElement;
        contentDocument.body.tabIndex = 0;
        content.contentEditable = 'true';
        content.style.position = 'absolute';
        content.style.top = '0';
        content.style.right = '0';
        content.style.bottom = '0';
        content.style.left = '0';
        content.style.outline = "none";
        content.style.fontFamily = 'Arial, Helvetica, sans-serif';
        content.style.fontSize = '14px';
        content.style.textAlign = 'left';
        content.innerHTML = '<div>This is a temporary paragraph. Double click to edit this text.</div>';



        let mousedown: boolean;

        // Flag that mouse is down
        contentDocument.addEventListener("mousedown", () => mousedown = true);

        // Take care of selection change on mouse up
        contentDocument.addEventListener("mouseup", () => {
            window.setTimeout(() => {
                this.onSelectionChange(contentDocument.getSelection().getRangeAt(0));
                applicationRef.tick();
                mousedown = false;
            });
        });


        // Take care of selection change only when mouse is not down
        contentDocument.addEventListener("selectionchange", () => {
            if (!mousedown) {
                this.onSelectionChange(contentDocument.getSelection().getRangeAt(0));
                applicationRef.tick();
            }
        });
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

        this.onSelectionChange(range);
    }


    onSelectionChange(range: Range) {
        let keys = Object.keys(this);
        keys.forEach((key: string) => {
            if (this[key].style) {
                this[key].onSelectionChange(range);
            }
        });
    }
}