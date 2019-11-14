export class Review {
    id: number;
    productId: string;
    title: string;
    rating: number;
    username: string;
    date: Date;
    isVerified: boolean;
    text: string;
    likes: number;
    dislikes: number;
    hasBeenRated?: boolean;
}