import { Product } from './product';

export interface ProductGroup {
    caption: string;
    products: Array<Product>;
}