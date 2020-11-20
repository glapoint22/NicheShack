import { NicheFilter } from './niche-filter';

export interface NichesFilter {
    visible: Array<NicheFilter>;
    hidden: Array<NicheFilter>;
    showHidden: boolean;
}