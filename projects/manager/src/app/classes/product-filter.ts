import { ProductFilterOption } from './product-filter-option';

export interface productFilter {
    id: number;
    name: string;
    options: Array<ProductFilterOption>;
}