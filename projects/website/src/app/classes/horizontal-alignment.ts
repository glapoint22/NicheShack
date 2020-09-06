import { HorizontalAlign } from 'classes/horizontal-align';

export class HorizontalAlignment {
    public value: HorizontalAlign = HorizontalAlign.Left;

    setData(value: string) {
        if (value) {
            this.value = value as HorizontalAlign;
        }
    }
}