import { ToggleableStyle } from './toggleable-style';

export class NodeStyle extends ToggleableStyle {
    hasStyle(element: HTMLElement): boolean {
        return element.tagName == this.style;
    }

    nodeHasStyle(node: HTMLElement): boolean {
        while (node != this.contentParentNode) {
            if (this.hasStyle(node)) return true;

            node = node.parentElement;
        }

        return false;
    }
}