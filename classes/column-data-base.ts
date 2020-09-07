import { BackgroundData } from './background-data';
import { BorderData } from './border-data';
import { CornersData } from './corners-data';
import { ShadowData } from './shadow-data';
import { PaddingData } from './padding-data';

export interface ColumnDataBase {
    background: BackgroundData;
    border: BorderData;
    corners: CornersData;
    shadow: ShadowData;
    padding: PaddingData;
    columnSpan: number;
}