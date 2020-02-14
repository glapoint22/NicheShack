import { ToggleableStyle } from './toggleable-style';

export class Bold extends ToggleableStyle {
    constructor(contentDocument: HTMLDocument) {
        super(contentDocument);

        this.style = 'fontWeight';
        this.styleValue = '700';
    }
}