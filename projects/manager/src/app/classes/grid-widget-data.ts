import { Query } from './query';
import { WidgetData } from './widget-data';

export interface GridWidgetData extends WidgetData {
    queries: Array<Query>;
}