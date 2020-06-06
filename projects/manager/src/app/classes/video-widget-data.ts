import { WidgetData } from './widget-data';
import { BorderData } from './border-data';
import { CornersData } from './corners-data';
import { ShadowData } from './shadow-data';
import { VideoData } from './video-data';

export class VideoWidgetData extends WidgetData {
    border: BorderData = new BorderData();
    corners: CornersData = new CornersData();
    shadow: ShadowData = new ShadowData();
    video: VideoData = new VideoData();
}