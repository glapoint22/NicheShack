import { Filters } from './filters';
import { Product } from './product';

export interface ProductResults {
    products: Array<Product>;
    totalProducts: number;
    filters: Filters;
    pageCount: number;
    sortOptions: any;
    productCountStart: number;
    productCountEnd: number;
}