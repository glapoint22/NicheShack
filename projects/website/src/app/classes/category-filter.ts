import { NicheFilter } from './niche-filter';
import { NichesFilter } from './niches-filter';

export interface CategoryFilter {
    urlId: string;
    name: string;
    urlName: string;
    niches: NichesFilter;
}