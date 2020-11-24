import { Product } from 'classes/product';

export interface ProductGroup {
    caption: string;
    products: Array<Product>;
}