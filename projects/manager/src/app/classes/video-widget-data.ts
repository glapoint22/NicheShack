import { WidgetData } from './widget-data';
import { BorderData } from './border-data';
import { CornersData } from './corners-data';
import { ShadowData } from './shadow-data';
import { VideoData } from './video-data';

export interface VideoWidgetData extends WidgetData {
    border: BorderData;
    corners: CornersData;
    shadow: ShadowData;
    video: VideoData;
}