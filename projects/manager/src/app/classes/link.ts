import { LinkData } from './link-data';

export class Link {
    public selectedOption: LinkOption;
    public url: string;
    public disabled: boolean;

    load(linkData: LinkData) {
        if (linkData) {
            if (linkData.selectedOption) this.selectedOption = linkData.selectedOption as LinkOption;
            if (linkData.url) this.url = linkData.url;
        }
    }


    save(linkData: LinkData) {
        if (this.selectedOption != LinkOption.None) linkData.selectedOption = this.selectedOption;
        if (this.url) linkData.url = this.url;
    }
}

export enum LinkOption {
    None = 'none',
    Page = 'page',
    Category = 'category',
    Niche = 'niche',
    Product = 'product',
    WebAddress = 'webAddress',
    OnClick = 'onClick'
}