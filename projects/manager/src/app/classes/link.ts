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