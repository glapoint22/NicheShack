import { ToggleableStyle } from './toggleable-style';
import { Subject } from 'rxjs';

export class Italic extends ToggleableStyle {
    constructor(contentDocument: HTMLDocument, onChange: Subject<string>) {
        super(contentDocument, onChange);

        this.style = 'fontStyle';
        this.styleValue = 'italic';
    }
}