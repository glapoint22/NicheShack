import { ImageData } from './image-data';
import { BorderData } from './border-data';
import { CornersData } from './corners-data';
import { ShadowData } from './shadow-data';
import { LinkData } from './link-data';

export interface ImageWidgetDataBase {
    image: ImageData;
    border: BorderData;
    corners: CornersData;
    shadow: ShadowData;
    link: LinkData;
}