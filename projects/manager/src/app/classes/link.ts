import { LinkData } from './link-data';

export class Link {
    public selectedOption: LinkOption;
    public url: string;
    public optionValue: string;
    public disabled: boolean;

    setData(linkData: LinkData) {
        if (linkData) {
            if (linkData.selectedOption) this.selectedOption = linkData.selectedOption as LinkOption;
            if (linkData.url) this.url = linkData.url;
            if (linkData.optionValue) this.optionValue = linkData.optionValue;
        }
    }


    getData(): LinkData {
        if (this.selectedOption == LinkOption.None) return null;

        return {
            selectedOption: this.selectedOption,
            url: this.url,
            optionValue: this.optionValue
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