import { BackgroundData } from './background-data';
import { BorderData } from './border-data';
import { CornersData } from './corners-data';
import { ShadowData } from './shadow-data';
import { PaddingData } from './padding-data';
import { CaptionData } from './caption-data';
import { LinkData } from './link-data';
import { WidgetDataBase } from './widget-data-base';

export interface ButtonWidgetDataBase extends WidgetDataBase {
    background: BackgroundData;
    border: BorderData;
    caption: CaptionData;
    corners: CornersData;
    shadow: ShadowData;
    padding: PaddingData;
    link: LinkData;
    backgroundHoverColor: string;
    backgroundActiveColor: string;
    borderHoverColor: string;
    borderActiveColor: string;
    textHoverColor: string;
    textActiveColor: string;
}