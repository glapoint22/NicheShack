export class Link {
    public selectedOption: LinkOption;
    public url: string;
    public disabled: boolean;
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