import { BreakpointType } from './breakpoint-type';

export class ColumnSpan implements BreakpointType {
    private _value: number;
    public get value(): number {
        return this._value;
    }
    public set value(newValue: number) {
        // If this column has a column span value, replace it with the new value
        if (this._value) {
            if (this._value != newValue) this.columnElement.classList.replace('col-' + this._value, 'col-' + newValue);

            // Add the first column span value to this column
        } else {
            this.columnElement.classList.add('col-' + newValue);
        }

        this._value = newValue;
    }

    public defaultValue: number = 12;

    constructor(private columnElement: HTMLElement) { }


    setClass(element: HTMLElement, screenSize?: string) {
        element.classList.add('col-' + this.value + (screenSize ? '-' + screenSize : ''));
    }
}