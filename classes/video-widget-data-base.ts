import { BorderData } from './border-data';
import { CornersData } from './corners-data';
import { ShadowData } from './shadow-data';
import { VideoData } from './video-data';
import { WidgetDataBase } from './widget-data-base';

export interface VideoWidgetDataBase extends WidgetDataBase {
    border: BorderData;
    corners: CornersData;
    shadow: ShadowData;
    video: VideoData;
}