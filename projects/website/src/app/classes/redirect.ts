import { Params } from '@angular/router';

export interface Redirect {
    path: string;
    queryParams: Params;
}