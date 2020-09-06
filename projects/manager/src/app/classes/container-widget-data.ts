import { WidgetData } from './widget-data';
import { RowData } from './row-data';
import { ContainerWidgetDataBase } from 'classes/container-widget-data-base';

export interface ContainerWidgetData extends WidgetData, ContainerWidgetDataBase {
    rows: Array<RowData>;
}