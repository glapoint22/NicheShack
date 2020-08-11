import { BackgroundData } from './background-data';
import { RowData } from './row-data';

export interface PageData {
    id: number;
    name: string;
    width: number;
    background: BackgroundData;
    rows: Array<RowData>;
}