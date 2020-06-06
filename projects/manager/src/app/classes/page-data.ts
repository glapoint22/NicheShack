import { BackgroundData } from './background-data';
import { RowData } from './row-data';

export class PageData {
    public id: string;
    public name: string;
    public width: number;
    public background: BackgroundData = new BackgroundData();
    public rows: Array<RowData> = [];
}