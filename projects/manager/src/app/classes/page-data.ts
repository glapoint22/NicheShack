import { RowData } from './row-data';
import { BackgroundData } from './background-data';

export class PageData {
    name: string;
    width: number;
    background: BackgroundData;
    rows: Array<RowData>;
}