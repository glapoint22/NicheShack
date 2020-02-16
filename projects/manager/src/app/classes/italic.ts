import { ToggleableStyle } from './toggleable-style';

export class Italic extends ToggleableStyle {
    constructor(contentDocument: HTMLDocument) {
        super(contentDocument);

        this.style = 'fontStyle';
        this.styleValue = 'italic';
    }
}