import { CaptionData } from './caption-data';
import { Query } from './query';

export interface ProductGroupWidgetDataBase {
    caption: CaptionData;
    queries: Array<Query>;
}