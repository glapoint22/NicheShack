import { WidgetData } from './widget-data';
import { BackgroundData } from './background-data';
import { BorderData } from './border-data';
import { ButtonTextData } from './button-text-data';
import { CornersData } from './corners-data';
import { ShadowData } from './shadow-data';
import { PaddingData } from './padding-data';
import { LinkData } from './link-data';

export interface ButtonWidgetData extends WidgetData {
    background: BackgroundData;
    border: BorderData;
    text: ButtonTextData;
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