import { ToggleableStyle } from './toggleable-style';
import { Subject } from 'rxjs';

export class Bold extends ToggleableStyle {
    constructor(contentDocument: HTMLDocument, onChange: Subject<string>) {
        super(contentDocument, onChange);

        this.style = 'fontWeight';
        this.styleValue = '700';
    }
}