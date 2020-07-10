import { CaseStyle } from './case-style';
import { Subject } from 'rxjs';

export class UppercaseStyle extends CaseStyle {
    constructor(contentDocument: HTMLDocument, onChange: Subject<void>) {
        super(contentDocument, onChange);
    }

    setCase(text: string): string {
        return text.toUpperCase();
    }
}