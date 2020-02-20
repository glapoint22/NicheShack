import { Color } from './color';

export class ButtonText {
    caption: string = 'Button';
    fontFamily: string = 'Arial, Helvetica, sans-serif';
    fontSize: number = 15;
    fontWeight: string = 'normal';
    fontStyle: string = 'normal';
    color: Color = new Color(200, 200, 200, 1);
    hoverColor: Color = new Color(255, 255, 255, 1);
}