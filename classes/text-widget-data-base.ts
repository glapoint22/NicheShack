import { BackgroundData } from './background-data';
import { PaddingData } from './padding-data';

export interface TextWidgetDataBase {
    background: BackgroundData;
    padding: PaddingData;
    htmlContent: string;
}