import { Color } from './color';

export class Shadow {
    enable: boolean;
    x: number = 5;
    y: number = 5;
    blur: number = 5;
    size: number = 5;
    color: Color = new Color(0, 0, 0, 0.75);
}