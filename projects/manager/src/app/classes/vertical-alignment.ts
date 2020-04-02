export class VerticalAlignment {
    value: string = 'flex-start';

    applyStyle(element: HTMLElement) {
        element.style.alignItems = this.value;
    }
}