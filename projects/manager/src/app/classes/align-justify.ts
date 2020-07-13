import { LineStyle } from './line-style';
import { Subject } from 'rxjs';

export class AlignJustify extends LineStyle {
    constructor(contentDocument: HTMLDocument, onChange: Subject<string>) {
        super(contentDocument, onChange);

        this.style = 'textAlign';
        this.styleValue = 'justify';
    }
}