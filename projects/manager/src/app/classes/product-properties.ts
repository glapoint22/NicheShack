import { Item } from './item';
import { Product } from './product';
import { productFilter } from './product-filter';

export class ProductProperties extends Product {
    vendor: Item;
    filters: Array<productFilter> = [];
    keywords: Array<Item> = [];
}