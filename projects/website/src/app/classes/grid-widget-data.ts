import { GridData } from 'classes/grid-data';
import { WidgetDataBase } from 'classes/widget-data-base';

export interface GridWidgetData extends WidgetDataBase {
    gridData: GridData;
}