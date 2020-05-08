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
import { LinkStyle } from './link-style';
import { Subject } from 'rxjs';

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
    public linkStyle: LinkStyle;
    public onChange = new Subject<void>();
    public content: HTMLElement;


    constructor(private contentDocument: HTMLDocument, private applicationRef: ApplicationRef, defaultFontColor: Color) {
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
        this.linkStyle = new LinkStyle(contentDocument);
        this.content = contentDocument.body.firstElementChild as HTMLElement;


        let styleTag = document.createElement('style');
        let styles = document.createTextNode(
            `body {
                font-family: Arial, Helvetica, sans-serif;
                font-size: 14px;
                text-align: left;
                color: ` + defaultFontColor.toRGBString() + `;
                line-height: normal;
            }
            ul, ol {
                margin-top: 0;
                margin-bottom: 0;
                list-style-position: inside;
            }
            li div {
                display: inline;
            }
            a { 
                color: inherit;
            }
            `
        );

        styleTag.appendChild(styles);

        contentDocument.head.appendChild(styleTag);


        // Content
        contentDocument.body.tabIndex = 0;
        this.content.contentEditable = 'true';
        this.content.style.position = 'absolute';
        this.content.style.top = '0';
        this.content.style.right = '0';
        this.content.style.bottom = '0';
        this.content.style.left = '0';
        this.content.style.outline = "none";
        // this.contentParent.innerHTML = '<div>' + (this.text ? this.text : '&#8203;') + '</div>';
        this.content.innerHTML = '<div>&#8203;</div>';


        // Give focus to the document
        this.content.focus();

        let selection = this.contentDocument.getSelection();
        let range = selection.getRangeAt(0);

        // If there is no text
        // if (!this.text) {
            // Set the start and end of the range
            range.setStart(range.startContainer, 1);
            range.setEnd(range.startContainer, 1);
        // }
        
        // This will basically initialize the properties (ie. bold, fontSize, fontColor etc.)
        this.onSelectionChange(range);


        // Take care of selection change on mouse up
        contentDocument.addEventListener("mouseup", () => {
            this.onSelectionEvent();
        });


        // Prevent dragging
        contentDocument.addEventListener("dragstart", (event) => {
            event.preventDefault();
        });


        contentDocument.addEventListener('paste', (event) => {
            let selection: Selection = this.contentDocument.getSelection();
            let clipboardText: string = event.clipboardData.getData('text/plain');

            // If we have no selection, return
            if (!selection.anchorNode || clipboardText == '') return;

            let style = new Style(this.contentDocument);

            let range = selection.getRangeAt(0);
            let text: Text = document.createTextNode(clipboardText);
            let singleLineSelection = range.commonAncestorContainer != this.content &&
                (range.commonAncestorContainer as HTMLElement).tagName != 'OL' &&
                (range.commonAncestorContainer as HTMLElement).tagName != 'UL';

            // Prevent from contents being pasted
            event.preventDefault();


            // Remove the first character if it is a zero-width character
            if (range.collapsed) {
                if ((range.startContainer as Text).data.charCodeAt(0) == 8203) {
                    (range.startContainer as Text).deleteData(0, 1);
                }
            }


            // Delete the contents
            range.deleteContents();

            // If not a single line selection, we need to create a div for the contents to go in
            if (!singleLineSelection) {
                let div = document.createElement('DIV');
                div.appendChild(text);
                range.insertNode(div);
            } else {
                range.insertNode(text);
            }


            // Reset the range
            range.setStart(text, text.length);
            range.setEnd(text, text.length);

            // Remove any empty nodes;
            style.removeEmptyNodes(this.content);
        });




        contentDocument.addEventListener("keypress", (event: KeyboardEvent) => {
            window.setTimeout(() => {
                let selection: Selection = this.contentDocument.getSelection();

                if (!selection.anchorNode) return;

                let range = selection.getRangeAt(0);

                // If the enter key is not pressed
                if (event.keyCode != 13 && range.startContainer.nodeType == 3) {
                    let text: Text = range.startContainer as Text;

                    // Remove the first character if it is a zero-width character
                    if (text.data.charCodeAt(0) == 8203) {
                        text.deleteData(0, 1);
                    }
                }
            });
        });

        contentDocument.oninput = () => {
            this.onChange.next();
            applicationRef.tick();
        }

        // Take care of selection change on keydown
        contentDocument.addEventListener("keydown", (event: KeyboardEvent) => {
            let selection: Selection = this.contentDocument.getSelection();

            if (!selection.anchorNode) return;

            let range = selection.getRangeAt(0);


            // Backspace or delete was pressed
            if (event.keyCode == 8 || event.keyCode == 46) {
                let style = new Style(this.contentDocument);

                // If range is collapsed
                if (range.collapsed) {
                    let parent = style.getSelectionParent(range.startContainer);

                    // If the parent has one child
                    if (range.startContainer == style.getFirstTextChild(parent) && range.startContainer == style.getLastTextChild(parent)) {
                        let text: Text = range.startContainer as Text;

                        // If the text has one character
                        if (text.length == 1) {

                            // If the delete key was pressed and the cursor is on the right side of the character
                            // or backspace was pressed and the cursor is on the left side of the character - do nothing and return
                            if ((event.keyCode == 46 && range.startOffset == 1) || (event.keyCode == 8 && range.startOffset == 0)) return;

                            // If the character is a zero-width character
                            if (text.data.charCodeAt(0) == 8203) {

                                // If we are inside a list
                                if (parent.parentElement.tagName == 'LI') {
                                    let listItem: HTMLElement = parent.parentElement;
                                    let listParent: HTMLElement = listItem.parentElement;

                                    // If the list item is the first child of the list
                                    if (listItem == listParent.firstChild) {
                                        // Create a new range so we can extract the remaining content from the list
                                        let newRange = document.createRange();
                                        newRange.setStartBefore(parent);
                                        newRange.setEndAfter(parent.lastChild);

                                        // Extract the contents and insert it before the list parent
                                        let docFrag = newRange.extractContents();
                                        this.content.insertBefore(docFrag, listParent);

                                        // Remove the empty list item
                                        listItem.remove();

                                        // If there are no more list items, remove the list parent
                                        if (listParent.childNodes.length == 0) {
                                            listParent.remove();
                                        }


                                        // Reset the range
                                        range.setStart(text, 1);
                                        range.setEnd(text, 1);
                                        event.preventDefault();
                                    } else {
                                        text.replaceWith(document.createElement('BR'));
                                    }


                                    // We are not inside a list
                                } else
                                    // If this is the first element of the content, do nothing
                                    if (parent == this.content.firstElementChild) {
                                        event.preventDefault();
                                    } else {
                                        // By replacing the text with a BR tag, it will cause the cursor to move up to the next line
                                        text.replaceWith(document.createElement('BR'));
                                    }

                            } else {
                                // Replace the last character with a zero-width character
                                text.replaceWith(document.createTextNode('\u200B'));
                                range.setStart(range.startContainer.firstChild, 1);
                                selection.removeAllRanges();
                                selection.addRange(range);
                                event.preventDefault();
                            }
                        }
                    }

                    // Range is NOT collapsed
                } else {
                    let startParent: HTMLElement = style.getSelectionParent(range.startContainer);
                    let endParent: HTMLElement = style.getSelectionParent(range.endContainer);

                    // Selection contains all characters from the start container and end container
                    if (range.startOffset == 0 &&
                        range.endOffset == (range.endContainer as Text).length &&
                        style.getFirstTextChild(startParent) == range.startContainer &&
                        style.getLastTextChild(endParent) == range.endContainer) {

                        window.setTimeout(() => {
                            // Create the zero-width character
                            let text = document.createTextNode('\u200B');

                            // If the start container is a list element or content parent
                            if ((range.startContainer as HTMLElement).tagName == 'LI' || range.startContainer == this.content) {
                                let div = document.createElement('DIV');
                                div.appendChild(text);

                                // Replace the BR tag with the new div
                                range.startContainer.firstChild.replaceWith(div);
                            } else {
                                // Replace the BR tag with the zero-width text
                                range.startContainer.firstChild.replaceWith(text);
                            }

                            // Reset the range
                            range.setStart(text, 1);
                            range.setEnd(text, 1);
                            selection.removeAllRanges();
                            selection.addRange(range);
                        });
                    }
                }
            }

            window.setTimeout(() => {

                range = selection.getRangeAt(0);

                if (event.keyCode == 37) {
                    let text: Text = range.startContainer as Text;

                    // Make sure the cursor is not before the zero-width character
                    if (text.data.charCodeAt(0) == 8203) {
                        range.setStart(range.startContainer, 1);
                    }
                }

                // If the enter key was pressed
                if (event.keyCode == 13) {
                    if (range.startContainer.nodeType == 1) {
                        range.startContainer.firstChild.replaceWith(document.createTextNode('\u200B'));
                        range.setStart(range.startContainer.firstChild, 1);
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                }
            });
            this.onSelectionEvent();
        });
    }



    onSelectionEvent() {
        window.setTimeout(() => {
            let selection: Selection = this.contentDocument.getSelection();

            if (selection.anchorNode) {
                this.onSelectionChange(selection.getRangeAt(0));
                this.applicationRef.tick();
            }
        });
    }

    selectContents() {
        // Give focus to the document
        this.content.focus();

        let selection = this.contentDocument.getSelection();
        let range = selection.getRangeAt(0);
        let style = new Style(this.contentDocument);
        let firstTextChild = style.getFirstTextChild(this.content);

        if (firstTextChild) {
            let lastTextChild = style.getLastTextChild(this.contentDocument.body.lastElementChild);

            // Set the start and end of the range
            range.setStart(firstTextChild, 0);
            range.setEnd(lastTextChild, lastTextChild.length);

            // Select the range
            selection.removeAllRanges();
            selection.addRange(range);
        }
        this.onSelectionChange(range);
    }


    onSelectionChange(range: Range) {
        let keys = Object.keys(this);
        keys.forEach((key: string) => {
            if (this[key].onSelectionChange) {
                this[key].onSelectionChange(range);
            }
        });
    }


    removeSelection() {
        this.contentDocument.getSelection().removeAllRanges();
    }
}