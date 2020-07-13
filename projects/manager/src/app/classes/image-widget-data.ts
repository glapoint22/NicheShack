import { WidgetData } from './widget-data';
import { BorderData } from './border-data';
import { CornersData } from './corners-data';
import { ShadowData } from './shadow-data';
import { LinkData } from './link-data';
import { Image } from './image';

export class ImageWidgetData extends WidgetData {
    image: Image = new Image();
    border: BorderData = new BorderData();
    corners: CornersData = new CornersData();
    shadow: ShadowData = new ShadowData();
    link: LinkData = new LinkData();
}