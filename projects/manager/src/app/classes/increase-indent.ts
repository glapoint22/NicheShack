import { Indent } from './indent';

export class IncreaseIndent extends Indent {
    
    constructor(contentDocument: HTMLDocument) {
        super(contentDocument);

        this.indentDirection = 1;
    }
    
}