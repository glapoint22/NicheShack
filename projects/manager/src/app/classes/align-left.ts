import { LineStyle } from './line-style';
import { Subject } from 'rxjs';

export class AlignLeft extends LineStyle {
    constructor(contentDocument: HTMLDocument, onChange: Subject<string>) {
        super(contentDocument, onChange);

        this.style = 'textAlign';
        this.styleValue = 'left';
    }
}