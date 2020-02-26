import { ListStyle } from './list-style';

export class OrderedList extends ListStyle {
    constructor(contentDocument: HTMLDocument) {
        super(contentDocument);

        this.style = 'OL';
    }
}