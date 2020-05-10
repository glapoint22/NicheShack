import { Color } from './color';

export class PageBackground {
    backgroundType: PageBackgroundType;
    color: Color;
    image: string;
}

export enum PageBackgroundType {
    Color,
    Image,
}