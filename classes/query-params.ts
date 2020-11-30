import { ParamMap } from '@angular/router';
import { Query } from './query';

export class QueryParams {
    search?: string = '';
    filters: string = '';
    categoryId: string = '';
    nicheId: string = '';
    sort: string = '';
    page: number = 1;
    limit: number;
    queries: Array<Query>;

    set(params: ParamMap) {
        this.search = params.get('search');
        this.filters = params.get('filters');
        this.categoryId = params.get('categoryId');
        this.nicheId = params.get('nicheId');
        this.sort = params.get('sort');
        this.page = params.has('page') ? Math.max(1, Number.parseInt(params.get('page'))) : 1;
    }
}