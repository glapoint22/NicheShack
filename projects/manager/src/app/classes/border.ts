import { Color } from './color';

export class Border {
    apply: boolean;
    width: number = 1;
    style: string ='solid';
    color: Color = { 
        r: 190,
        g: 190,
        b: 190,
        a: 1
     };
    hoverColor: Color = { 
        r: 255,
        g: 255,
        b: 255,
        a: 1
     };
}