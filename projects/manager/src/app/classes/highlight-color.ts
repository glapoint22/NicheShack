import { ColorStyle } from './color-style';
import { Color } from './color';

export class HighlightColor extends ColorStyle {

    constructor(contentDocument: HTMLDocument) {
        super(contentDocument);

        this.style = 'backgroundColor';

        this.defaultColor = new Color(255, 255, 255, 1);
    }

    getComputedColor(): string {
        let node: HTMLElement = this.selectedRange.startContainer as HTMLElement;
        let colorValue: string;

        while (node.parentElement != this.contentDocument.body.firstElementChild) {
            colorValue = window.getComputedStyle(node.parentElement)[this.style];

            if (colorValue != 'rgba(0, 0, 0, 0)') break;

            node = node.parentElement;
        }

        return colorValue;
    }

    nodeHasStyle(node: HTMLElement): boolean {
        return this.nodeHasStyleAlt(node);
    }
}