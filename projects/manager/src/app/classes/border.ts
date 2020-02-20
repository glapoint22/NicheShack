import { Color } from './color';

export class Border {
    apply: boolean;
    width: number = 1;
    style: string = 'solid';
    color: Color = new Color(190, 190, 190, 1);
    hoverColor: Color = new Color(255, 255, 255, 1);
}