import { WidgetData } from './widget-data';
import { BackgroundData } from './background-data';
import { PaddingData } from './padding-data';

export interface TextWidgetData extends WidgetData {
    background: BackgroundData;
    padding: PaddingData;
    htmlContent: string;
}