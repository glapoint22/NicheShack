import { Product } from './product';
import { Media } from './media';

export interface ProductInfo {
    product: Product;
    media: Array<Media>;
}