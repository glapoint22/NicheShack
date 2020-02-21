import { LineStyle } from './line-style';

export class AlignLeft extends LineStyle {
    constructor(contentDocument: HTMLDocument) {
        super(contentDocument);

        this.style = 'textAlign';
        this.styleValue = 'left';
    }
}