import { GridData } from 'classes/grid-data';
import { Query } from 'classes/query';
import { WidgetData } from './widget-data';

export interface GridWidgetData extends WidgetData {
    queries: Array<Query>;
    gridData: GridData;
}