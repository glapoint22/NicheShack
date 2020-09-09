import { ColumnDataBase } from 'classes/column-data-base';
import { WidgetDataBase } from 'classes/widget-data-base';

export interface ColumnData extends ColumnDataBase {
    widgetData: WidgetDataBase;
}