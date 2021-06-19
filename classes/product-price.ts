import { ImageData } from "./image-data";
import { ShippingType } from "./shipping-type";

export class ProductPrice {
    id: number;
    image: ImageData = new ImageData();
    header: string;
    quantity: string;
    unitPrice: string;
    unit: string;
    strikethroughPrice: string;
    price: number;
    shipping: ShippingType;
    shippingPrice: number;
}