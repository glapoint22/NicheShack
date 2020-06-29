import { Item } from './item';

export interface Searchable {
    apiUrl: string;
    searchResults: Array<Item>;
    items: Array<Item>;
    setSearchItem(searchItem: any): void;
}