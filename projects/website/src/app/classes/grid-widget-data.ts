import { Query } from 'classes/query';
import { WidgetDataBase } from 'classes/widget-data-base';

export interface GridWidgetData extends WidgetDataBase {
    queries: Array<Query>;
}