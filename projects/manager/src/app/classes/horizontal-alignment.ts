export class HorizontalAlignment {
    value: string = HorizontalAlign.Center;

    applyStyle(element: HTMLElement) {
        element.style.margin = this.value;
    }

    getStyle() {
        return '\n\tmargin: ' + this.value + ';';
    }
}

export enum HorizontalAlign {
    Left = "0",
    Center = "0 auto",
    Right = "0 0 0 auto"
}