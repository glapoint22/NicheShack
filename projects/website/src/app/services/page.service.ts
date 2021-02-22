import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { QueryParams } from 'classes/query-params';
import { Observable, Subscriber } from 'rxjs';
import { DataService } from 'services/data.service';
import { PageData } from '../classes/page-data';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private queryParams: QueryParams = new QueryParams();

  constructor(private dataService: DataService) { }

  getPage(snapshot: ActivatedRouteSnapshot, url: string): Observable<PageData> {
    return new Observable<PageData>((subscriber: Subscriber<PageData>) => {
      // Show the loading spinner
      this.dataService.loading = true;

      // Set the query params
      this.queryParams.set(snapshot.queryParamMap, snapshot.paramMap);

      // Get the page
      this.dataService.post(url, this.queryParams)
        .subscribe((pageData: PageData) => {
          // Hide the loading spinner
          this.dataService.loading = false;

          // Return the page
          subscriber.next(pageData);
          subscriber.complete();
        });
    });
  }
}