import { RowDataBase } from 'classes/row-data-base';
import { ContainerWidgetDataBase } from 'classes/container-widget-data-base';

export interface ContainerWidgetData extends ContainerWidgetDataBase {
    rows: Array<RowDataBase>;
}