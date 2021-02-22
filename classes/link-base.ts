import { LinkData } from './link-data';

export class LinkBase {
    public id: number;
    public selectedOption: LinkOption;
    public url: string;
    public optionValue: string;
    public disabled: boolean;

    setData(linkData: LinkData) {
        if (linkData) {
            this.id = linkData.id;
            if (linkData.selectedOption) this.selectedOption = linkData.selectedOption as LinkOption;
            if (linkData.url) this.url = linkData.url;
            if (linkData.optionValue) this.optionValue = linkData.optionValue;
        }
    }
}


export enum LinkOption {
    None,
    Page,
    Product,
    WebAddress,
    OnClick
}