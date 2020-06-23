import { MediaType, Media } from './media';
import { ListItem } from './list-item';
import { SelectType } from './list-item-select-type';

export class MediaItem implements ListItem, Media {
    public id: string;
    public url: string;
    public selected: boolean;
    public selectType: SelectType;
    public name: string;
    public thumbnail: string;

    constructor(public type: MediaType) { }
}