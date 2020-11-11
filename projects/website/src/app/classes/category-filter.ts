import { NicheFilter } from './niche-filter';

export interface CategoryFilter {
    urlId: string;
    name: string;
    urlName: string;
    niches: Array<NicheFilter>;
}