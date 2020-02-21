import { LineStyle } from './line-style';

export class Indent extends LineStyle {
    public indentDirection: number;

    constructor(contentDocument: HTMLDocument) {
        super(contentDocument);

        this.style = 'marginLeft';
    }


    setStyle(parent: HTMLElement) {
        let currentIndent: number;

        if(parent.style[this.style] != '') {
            currentIndent = Number.parseInt(parent.style[this.style].match(/\d+/));
        } else {
            currentIndent = 0;
        }
        
        currentIndent += 40 * this.indentDirection;
        currentIndent = Math.max(0, currentIndent);

        this.styleValue = currentIndent + 'px';

        super.setStyle(parent);
    }
}