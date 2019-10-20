import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DataService } from 'services/data.service';
import * as jwtDecode from 'jwt-decode';
import { HttpRequest, HttpHeaders } from '@angular/common/http';
import { TokenData } from 'interfaces/token-data';



@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isRefreshing: boolean;
    private waitForAccessToken = new Subject<string>();

    public get cookieExpiration(): Date {
        // Cookie expires in 2 weeks
        return new Date(Date.now() + 1209600000);
    }

    public refreshUrl: string = 'api/Account/Refresh';


    constructor(private dataService: DataService) { }


    public getAccessTokenFromCookie(cookie: string): string {
        let token: string;

        // Make sure there are cookies
        if (cookie && cookie.length > 0) {
            // Split the cookies into an array
            let cookieArray = cookie.split(';');

            // Find the access cookie
            let tokenString = cookieArray.find(x => x.trim().substr(0, 6) == 'access');

            // read the access token from the cookie
            if (tokenString) token = tokenString.substr(tokenString.indexOf('=') + 1);

        }

        return token;
    }

    public refresh(): Observable<string> {
        return new Observable<string>(observer => {

            // If refreshing in not already in progress
            if (!this.isRefreshing) {
                this.isRefreshing = true;

                // Get a new access token and refresh token
                this.dataService.get(this.refreshUrl)
                    .subscribe((tokenData: TokenData) => {
                        let accessToken: string;

                        if(tokenData) accessToken = tokenData.accessToken;

                        // Pass the access token
                        observer.next(accessToken);
                        observer.complete();
                        this.waitForAccessToken.next(accessToken);
                        this.waitForAccessToken.complete();
                    });
            } else {
                // Refreshing has already started, so we need to wait for the access token
                this.waitForAccessToken
                    .subscribe((accessToken: string) => {
                        // Pass the access token
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


    setHttpRequest(req: HttpRequest<any>, accessToken: string = null, cookie: any = {}, apiUrl: string = null): HttpRequest<any> {
        // Returns a new request object with updated properties
        return req.clone(
            {
                url: apiUrl ? (apiUrl + req.url) : req.url,
                headers: new HttpHeaders({
                    cookie: cookie,
                    Authorization: accessToken ? ('Bearer ' + accessToken) : ''
                })
            }
        )
    }

    setCookies(accessToken: string, refreshToken: string, response: any = {}) {
        let jwtToken = jwtDecode(accessToken);
        let expiration: string | any;

        // Set cookies on server
        if (Object.keys(response).length > 0) {
            expiration = jwtToken.isPersistent == 'True' ? { expires: this.cookieExpiration } : {};
            response
                // Access cookie
                .cookie('access', accessToken, expiration)

                // Refresh cookie
                .cookie('refresh', refreshToken, expiration);

        // Set cookies on client
        } else {
            expiration = jwtToken.isPersistent == 'True' ? '; expires=' + this.cookieExpiration.toUTCString() : '';

            // Access cookie
            document.cookie = 'access=' + accessToken + expiration;

            // Refresh cookie
            document.cookie = 'refresh=' + refreshToken + expiration;
        }


    }
}
