import { BackgroundData } from './background-data';
import { RowData } from './row-data';
import { PageType } from './page';

export class PageData {
    public id: string;
    public name: string;
    public width: number;
    public background: BackgroundData = new BackgroundData();
    public rows: Array<RowData> = [];
    public type: PageType;
}