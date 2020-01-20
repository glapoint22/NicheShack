import { Color } from './color';

export class FillColor {
    apply: boolean;
    color: Color = {
        r: 128,
        g: 128,
        b: 128,
        a: 1
    };
    hoverColor: Color = {
        r: 150,
        g: 150,
        b: 150,
        a: 1
    };
}