import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DataService } from 'services/data.service';
import { TokenData } from '../interfaces/token-data';
import * as jwtDecode from 'jwt-decode';
import { HttpRequest, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private isRefreshing: boolean;
  private waitForToken = new Subject();

  constructor(private dataService: DataService) { }


  public getAccessTokenFromCookie(cookie: string): string {
    let token: string;

    if (cookie.length > 0) {
      let cookieArray = cookie.split(';');
      let tokenString = cookieArray.find(x => x.trim().substr(0, 6) == 'access');
      token = tokenString.substr(tokenString.indexOf('=') + 1);
    }

    return token;
  }

  public refresh(): Observable<string> {
    return new Observable<string>(observer => {
      if (!this.isRefreshing) {
        this.isRefreshing = true;
        this.dataService.get('api/Account/Refresh')
          .subscribe((tokenData: TokenData) => {
            let accessToken;


            if (tokenData) accessToken = tokenData.accessToken;

            observer.next(accessToken);
            observer.complete();
            this.waitForToken.next(accessToken);
            this.waitForToken.complete();
          });
      } else {
        this.waitForToken.subscribe((accessToken: string) => {
          observer.next(accessToken);
          observer.complete();
          this.isRefreshing = false;
        });
      }

    })
  }

  isAccessTokenExpired(token: string): boolean {
    let jwtToken = jwtDecode(token);
    return new Date(jwtToken.exp * 1000).valueOf() - new Date().valueOf() < 0;
  }


  setHttpRequest(req: HttpRequest<any>, token: string = null, cookie: any = {}, apiUrl: string = null): HttpRequest<any> {
    return req.clone(
      {
        url: apiUrl ? (apiUrl + req.url) : req.url,
        headers: new HttpHeaders({
          cookie: cookie,
          Authorization: token ? ('Bearer ' + token) : ''
        })
      }
    )
  }
}
