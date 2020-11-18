import { KeyValue } from '@angular/common';
import { Product } from '../interfaces/product';
import { Filters } from './filters';

export interface ProductResults {
    products: Array<Product>;
    totalProducts: number;
    filters: Filters;
    numProductsPerPageOptions: KeyValue<string, string>;
    sortOptions: KeyValue<string, string>;
}