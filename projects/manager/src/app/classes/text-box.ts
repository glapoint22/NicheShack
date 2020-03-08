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
import { OrderedList } from './ordered-list';
import { UnorderedList } from './unordered-list';
import { Color } from './color';

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
    public orderedList: OrderedList;
    public unorderedList: UnorderedList;

    constructor(private contentDocument: HTMLDocument, applicationRef: ApplicationRef, defaultFontColor: Color) {
        // Styles
        this.bold = new Bold(contentDocument);
        this.italic = new Italic(contentDocument);
        this.underline = new Underline(contentDocument);
        this.font = new Font(contentDocument);
        this.fontSize = new FontSize(contentDocument);
        this.fontColor = new FontColor(contentDocument, defaultFontColor);
        this.highlightColor = new HighlightColor(contentDocument);
        this.alignLeft = new AlignLeft(contentDocument);
        this.alignCenter = new AlignCenter(contentDocument);
        this.alignRight = new AlignRight(contentDocument);
        this.alignJustify = new AlignJustify(contentDocument);
        this.increaseIndent = new IncreaseIndent(contentDocument);
        this.decreaseIndent = new DecreaseIndent(contentDocument);
        this.orderedList = new OrderedList(contentDocument);
        this.unorderedList = new UnorderedList(contentDocument);


        let styleTag = document.createElement('style');
        let styles = document.createTextNode(
            `body {
                font-family: Arial, Helvetica, sans-serif;
                font-size: 14px;
                text-align: left;
                color: ` + defaultFontColor.toRGBAString() + `
            }
            ul, ol {
                margin-top: 0;
                margin-bottom: 0;
                list-style-position: inside;
            }
            li div {
                display: inline;
            }
            `
        );

        styleTag.appendChild(styles);

        contentDocument.head.appendChild(styleTag);


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
        content.innerHTML = '<div><br></div>';



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
                let selection: Selection = contentDocument.getSelection();

                if (selection.anchorNode) {
                    this.onSelectionChange(selection.getRangeAt(0));
                    applicationRef.tick();
                }
            }
        });
    }

    selectContents() {
        let style = new Style(this.contentDocument);
        let content: HTMLElement = this.contentDocument.body.firstElementChild as HTMLElement;
        let firstTextChild = style.getFirstTextChild(this.contentDocument.body.firstElementChild);

        if (firstTextChild) {
            let lastTextChild = style.getLastTextChild(this.contentDocument.body.lastElementChild);
            let sel = this.contentDocument.getSelection();
            let range = document.createRange();


            // Set the start and end of the range
            range.setStart(firstTextChild, 0);
            range.setEnd(lastTextChild, lastTextChild.length);

            // Select the range
            sel.removeAllRanges();
            sel.addRange(range);

            this.onSelectionChange(range);
        }


        // Give focus
        content.focus();
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