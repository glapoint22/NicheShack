import { BackgroundData } from './background-data';
import { PaddingData } from './padding-data';
import { WidgetDataBase } from './widget-data-base';

export interface TextWidgetDataBase extends WidgetDataBase {
    background: BackgroundData;
    padding: PaddingData;
    htmlContent: string;
}