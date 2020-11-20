import { ImageData } from 'classes/image-data';

export interface Product {
    id: string;
    urlId: string;
    name: string;
    urlName: string;
    image: ImageData;
    rating: number;
    totalReviews: number;
    minPrice: number;
    maxPrice: number;
    hoplink: string;
    shareImage: string;
    description: string;
    oneStar: number;
    twoStars: number;
    threeStars: number;
    fourStars: number;
    fiveStars: number;
}