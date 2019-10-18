import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DataService } from 'services/data.service';
import { HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private isRefresh: boolean;
  private foo = new Subject()

  constructor(private dataService: DataService) { }


  public getAccessTokenFromCookie(cookie: string): string {
    let token: string;
    let regEx = new RegExp(/(?:[a-zA-Z]+=)([A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*)/, 'g');
    let results = regEx.exec(cookie);
    if (results) token = results[1];

    return token;
  }

  public refresh(): Observable<HttpEvent<any>> {
    return new Observable<HttpEvent<any>>(observer => {
      if(!this.isRefresh) {
        this.isRefresh = true;
        this.dataService.get('api/Account/Refresh')
        .subscribe(() => {
          observer.next();
          observer.complete();
          this.foo.next();
          this.foo.complete();
        });
      }else {
        this.foo.subscribe(()=> {
          observer.next();
          observer.complete();
          this.isRefresh = false;
        });
      }
      
    })
  }
}
