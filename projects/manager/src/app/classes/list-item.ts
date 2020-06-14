import { SelectType } from './list-item-select-type';
import { Item } from './item';

export interface ListItem extends Item {
    selected: boolean;
    selectType: SelectType;
}