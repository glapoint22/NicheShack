import { OrderProductInfo } from './order-product-info';

export interface ProductOrder {
    orderNumber: string;
    date: string;
    paymentMethod: string;
    paymentMethodImg: string;
    subtotal: number;
    shippingHandling: number;
    discount: number;
    tax: number;
    total: number;
    productUrlTitle: string;
    hoplink: string;
    products: Array<OrderProductInfo>;
}