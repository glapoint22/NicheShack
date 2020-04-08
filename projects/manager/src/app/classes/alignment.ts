export class Alignment {

    applyClass(element: HTMLElement, screenSize: string, className: string) {
        let cssClass = className + (screenSize ? '-' + screenSize : '');

        element.classList.add(cssClass);
    }
}