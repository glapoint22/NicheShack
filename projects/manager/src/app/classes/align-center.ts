import { LineStyle } from './line-style';
import { Subject } from 'rxjs';

export class AlignCenter extends LineStyle {
    constructor(contentDocument: HTMLDocument, onChange: Subject<void>) {
        super(contentDocument, onChange);

        this.style = 'textAlign';
        this.styleValue = 'center';
    }
}