import { WidgetType } from './widget-type';

export interface WidgetDataBase {
    width: number;
    height: number;
    widgetType: WidgetType;
    horizontalAlignment: string;
}