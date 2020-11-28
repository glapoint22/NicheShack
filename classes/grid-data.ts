import { Filters } from './filters';
import { Product } from './product';

export interface GridData {
    products: Array<Product>;
    totalProducts: number;
    filters: Filters;
    pageCount: number;
    sortOptions: any;
    productCountStart: number;
    productCountEnd: number;
}