import { ToggleableStyle } from './toggleable-style';

export class Underline extends ToggleableStyle {
    constructor(contentDocument: HTMLDocument) {
        super(contentDocument);

        this.style = 'textDecorationLine';
        this.styleValue = 'underline';
    }
}