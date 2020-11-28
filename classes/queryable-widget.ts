import { Query } from './query';

export interface QueryableWidget{
    queries: Array<Query>;
    query(queries: Array<Query>): void;
}