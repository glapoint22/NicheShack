import { ListStyle } from './list-style';
import { Subject } from 'rxjs';

export class OrderedList extends ListStyle {
    constructor(contentDocument: HTMLDocument, onChange: Subject<string>) {
        super(contentDocument, onChange);

        this.style = 'OL';
    }
}