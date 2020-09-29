import { ColumnDataBase } from 'classes/column-data-base';
import { WidgetData } from './widget-data';

export interface ColumnData extends ColumnDataBase {
    name: string;
    width: number;
    widgetData: WidgetData;
}