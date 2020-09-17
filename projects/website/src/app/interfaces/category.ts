import { Niche } from './niche';

export interface Category {
    id: number;
    name: string;
    urlName: string;
    icon: string;
    niches: Array<Niche>;
}