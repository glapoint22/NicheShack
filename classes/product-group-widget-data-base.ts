import { CaptionData } from './caption-data';
import { Product } from './product';
import { Query } from './query';

export interface ProductGroupWidgetDataBase {
    caption: CaptionData;
    queries: Array<Query>;
    products: Array<Product>
}