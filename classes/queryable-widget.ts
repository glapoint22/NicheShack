import { Query } from './query';
import { QueryParams } from './query-params';

export interface QueryableWidget{
    queryParams: QueryParams;
    query(queries: Array<Query>): void;
}