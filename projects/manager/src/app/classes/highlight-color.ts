import { ColorStyle } from './color-style';
import { Color } from './color';

export class HighlightColor extends ColorStyle {
    private isRemoveColor: boolean;

    constructor(contentDocument: HTMLDocument) {
        super(contentDocument);

        this.style = 'backgroundColor';
        this.defaultColor = new Color(255, 255, 0, 1);
    }

    getComputedColor(): string {
        let node: HTMLElement = this.selectedRange.startContainer as HTMLElement;
        let colorValue: string;

        while (node.parentElement != this.contentParentNode) {
            colorValue = window.getComputedStyle(node.parentElement)[this.style];

            if (colorValue != 'rgba(0, 0, 0, 0)') break;

            node = node.parentElement;
        }

        return colorValue;
    }

    nodeHasStyle(node: HTMLElement): boolean {
        return this.nodeHasStyleAlt(node);
    }

    setStyle(range: Range) {
        if(this.isRemoveColor) {
            this.removeStyle(range);
        } else {
            super.setStyle(range);
        }
    }

    removeColor() {
        this.isRemoveColor = true;
        this.applyStyle();
        this.isRemoveColor = false;
    }
}