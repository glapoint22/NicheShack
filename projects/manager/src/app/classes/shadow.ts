import { Color } from './color';

export class Shadow {
    enable: boolean;
    x: number = 5;
    y: number = 5;
    blur: number = 5;
    size: number = 5;
    color: Color = { r: 0, g: 0, b: 0, a: 0.75 };
}