import { BackgroundData } from './background-data';
import { RowData } from './row-data';

export interface PageData {
    name: string;
    width: number;
    background: BackgroundData;
    rows: Array<RowData>
}