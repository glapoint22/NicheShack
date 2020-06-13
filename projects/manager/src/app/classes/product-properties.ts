import { productFilter } from './product-filter';
import { Item } from './item';
import { Product } from './product';

export class ProductProperties extends Product {
    vendor: Item;
    filters: Array<productFilter> = [];
    keywords: Array<Item> = [];
}