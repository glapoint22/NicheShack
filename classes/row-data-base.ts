import { BackgroundData } from './background-data';
import { BorderData } from './border-data';
import { CornersData } from './corners-data';
import { ShadowData } from './shadow-data';
import { PaddingData } from './padding-data';
import { ColumnDataBase } from './column-data-base';

export interface RowDataBase {
    top: number;
    background: BackgroundData;
    border: BorderData;
    corners: CornersData;
    shadow: ShadowData;
    padding: PaddingData;
    verticalAlignment: string;
    columns: Array<ColumnDataBase>;
}