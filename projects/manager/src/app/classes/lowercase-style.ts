import { CaseStyle } from './case-style';
import { Subject } from 'rxjs';

export class LowercaseStyle extends CaseStyle {

    constructor(contentDocument: HTMLDocument, onChange: Subject<string>) {
        super(contentDocument, onChange);
    }

    setCase(text: string): string {
        return text.toLowerCase();
    }
}