import { VerticalAlign } from 'classes/vertical-align';

export class VerticalAlignment {
    public value: VerticalAlign = VerticalAlign.Top;

    setData(value: string) {
        if (value) {
            this.value = value as VerticalAlign;
        }
    }
}