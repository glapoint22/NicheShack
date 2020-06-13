import { ToggleableStyle } from './toggleable-style';
import { Subject } from 'rxjs';

export class Underline extends ToggleableStyle {
    constructor(contentDocument: HTMLDocument, onChange: Subject<void>) {
        super(contentDocument, onChange);

        this.style = 'textDecorationLine';
        this.styleValue = 'underline';
    }

    nodeHasStyle(node: HTMLElement): boolean {
        return this.nodeHasStyleAlt(node);
    }
}