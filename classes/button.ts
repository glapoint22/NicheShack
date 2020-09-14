import { BackgroundBase } from './background-base';
import { BackgroundColorBase } from './background-color-base';
import { BorderBase } from './border-base';
import { BorderColor } from './border-color';
import { CaptionBase } from './caption-base';
import { TextColorBase } from './text-color-base';

export interface Button {
    width: number;
    height: number;
    background: BackgroundBase;
    border: BorderBase;
    caption: CaptionBase;
    backgroundHoverColor: BackgroundColorBase;
    backgroundActiveColor: BackgroundColorBase;
    borderHoverColor: BorderColor;
    borderActiveColor: BorderColor;
    textHoverColor: TextColorBase;
    textActiveColor: TextColorBase;
}