import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public error: HttpErrorResponse;

  constructor(private http: HttpClient) { }

  get(url: string, parameters?: Array<any>): Observable<any> {
    let params = new HttpParams();

    //Set the params
    if (parameters) parameters.forEach(x => params = params.set(x.key, x.value));

    //Get the data
    return this.http.get(url, { params: params }).pipe(catchError(this.handleError()));
  }


  post(url: string, body: any) {
    return this.http.post(url, body).pipe(catchError(this.handleError()));
  }

  put(url: string, body: any) {
    return this.http.put(url, body).pipe(catchError(this.handleError()));
  }

  delete(url: string, params: any) {
    return this.http.delete(url, { params: params }).pipe(catchError(this.handleError()));
  }

  handleError() {
    return (error: HttpErrorResponse) => {
      if (error.status != 404 && error.status != 409) {
        this.error = error;
      }

      return throwError(error);
    }
  }
}