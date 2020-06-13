import { ListStyle } from './list-style';
import { Subject } from 'rxjs';

export class UnorderedList extends ListStyle {
    constructor(contentDocument: HTMLDocument, onChange: Subject<void>) {
        super(contentDocument, onChange);

        this.style = 'UL';
    }
}