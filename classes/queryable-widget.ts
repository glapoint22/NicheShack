import { Query } from './query';

export interface QueryableWidget{
    query(queries: Array<Query>): void;
}