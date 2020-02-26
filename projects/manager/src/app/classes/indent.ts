import { LineStyle } from './line-style';

export class Indent extends LineStyle {
    public indentDirection: number;

    constructor(contentDocument: HTMLDocument) {
        super(contentDocument);

        this.style = 'marginLeft';
    }


    setLineStyle(parent: HTMLElement) {
        let currentIndent: number;

        // Get the amount we need to indent by getting the current indent value
        if(parent.style[this.style] != '') {
            currentIndent = Number.parseInt(parent.style[this.style].match(/\d+/));
        } else {
            currentIndent = 0;
        }
        
        // Increase or decrease the indent
        currentIndent += 40 * this.indentDirection;

        // Don't go below zero
        currentIndent = Math.max(0, currentIndent);

        // Set the value
        this.styleValue = currentIndent + 'px';
        super.setLineStyle(parent);
    }
}