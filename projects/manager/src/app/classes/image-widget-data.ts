import { WidgetData } from './widget-data';
import { ImageData } from './image-data';
import { BorderData } from './border-data';
import { CornersData } from './corners-data';
import { ShadowData } from './shadow-data';
import { LinkData } from './link-data';

export class ImageWidgetData extends WidgetData {
    image: ImageData = new ImageData();
    border: BorderData = new BorderData();
    corners: CornersData = new CornersData();
    shadow: ShadowData = new ShadowData();
    link: LinkData = new LinkData();
}