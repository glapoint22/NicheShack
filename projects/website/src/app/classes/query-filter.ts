import { QueryFilterOption } from './query-filter-option';

export interface QueryFilter {
    caption: string;
    options: Array<QueryFilterOption>;
}