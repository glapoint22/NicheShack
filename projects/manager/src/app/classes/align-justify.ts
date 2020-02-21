import { LineStyle } from './line-style';

export class AlignJustify extends LineStyle {
    constructor(contentDocument: HTMLDocument) {
        super(contentDocument);

        this.style = 'textAlign';
        this.styleValue = 'justify';
    }
}