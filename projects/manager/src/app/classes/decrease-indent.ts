import { Indent } from './indent';

export class DecreaseIndent extends Indent {
    
    constructor(contentDocument: HTMLDocument) {
        super(contentDocument);

        this.indentDirection = -1;
    }
}