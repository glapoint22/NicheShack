import { ListStyle } from './list-style';

export class UnorderedList extends ListStyle {
    constructor(contentDocument: HTMLDocument) {
        super(contentDocument);

        this.style = 'UL';
    }
}