import { WidgetData } from './widget-data';
import { BackgroundData } from './background-data';
import { PaddingData } from './padding-data';

export class TextWidgetData extends WidgetData {
    background: BackgroundData = new BackgroundData();
    padding: PaddingData = new PaddingData();
    htmlContent: string;
}