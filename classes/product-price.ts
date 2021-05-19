import { ImageData } from "./image-data";
import { ShippingType } from "./shipping-type";

export class ProductPrice {
    id: number;
    image: ImageData = new ImageData();
    heading: string;
    quantity: string;
    unitPrice: number;
    unit: string;
    strikethroughPrice: number;
    price: number;
    shipping: ShippingType = ShippingType.None;
}