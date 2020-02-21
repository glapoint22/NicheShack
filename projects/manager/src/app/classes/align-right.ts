import { LineStyle } from './line-style';

export class AlignRight extends LineStyle {
    constructor(contentDocument: HTMLDocument) {
        super(contentDocument);

        this.style = 'textAlign';
        this.styleValue = 'right';
    }
}