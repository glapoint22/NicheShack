import { WidgetData } from './widget-data';
import { BackgroundData } from './background-data';
import { BorderData } from './border-data';
import { CaptionData } from './caption-data';
import { CornersData } from './corners-data';
import { ShadowData } from './shadow-data';
import { PaddingData } from './padding-data';
import { LinkData } from './link-data';

export class ButtonWidgetData extends WidgetData {
    public background: BackgroundData = new BackgroundData();
    public border: BorderData = new BorderData();
    public caption: CaptionData = new CaptionData();
    public corners: CornersData = new CornersData();
    public shadow: ShadowData = new ShadowData();
    public padding: PaddingData = new PaddingData();
    public link: LinkData = new LinkData();
    public backgroundHoverColor: string;
    public backgroundActiveColor: string;
    public borderHoverColor: string;
    public borderActiveColor: string;
    public textHoverColor: string;
    public textActiveColor: string;
}