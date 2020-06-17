import { Media, MediaType } from './media';
import { ListItem } from './list-item';
import { SelectType } from './list-item-select-type';
import { ImageData } from './image-data';

export class MediaItem implements ListItem {
    selected: boolean;
    selectType: SelectType;
    name: string;
    image: ImageData = new ImageData();
    videoUrl?: string;

    constructor(public id: string, imageUrl, public type: MediaType) {
        this.image.url = imageUrl;

    }
    
}