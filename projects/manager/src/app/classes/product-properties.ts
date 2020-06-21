import { Item } from './item';
import { Product } from './product';

export class ProductProperties extends Product {
    vendor: Item;
    filters: Array<Item> = [];
    keywords: Array<Item> = [];
}