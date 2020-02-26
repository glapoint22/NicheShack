import { LineStyle } from './line-style';

export class AlignCenter extends LineStyle {
    constructor(contentDocument: HTMLDocument) {
        super(contentDocument);

        this.style = 'textAlign';
        this.styleValue = 'center';
    }
}