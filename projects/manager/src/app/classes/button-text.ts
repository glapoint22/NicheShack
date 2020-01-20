import { Color } from './color';

export class ButtonText {
    caption: string = 'Button';
    fontFamily: string = 'Arial, Helvetica, sans-serif';
    fontSize: number = 15;
    fontWeight: string = 'normal';
    fontStyle: string = 'normal';
    color: Color = {
        r: 200,
        g: 200,
        b: 200,
        a: 1
    };
    hoverColor: Color = {
        r: 255,
        g: 255,
        b: 255,
        a: 1
    };
}