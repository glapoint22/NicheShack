import { Injectable } from '@angular/core';
import { Observable, Subject, Subscriber, Subscription } from 'rxjs';
import { DataService } from 'services/data.service';
import * as jwtDecode from 'jwt-decode';
import { HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
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
        return new Observable<string>((subscriber: Subscriber<string>) => {
            // If refreshing in not already in progress
            if (!this.isRefreshing) {
                this.isRefreshing = true;

                // Get a new access token and refresh token
                this.dataService.get(this.refreshUrl)
                    .subscribe((tokenData: TokenData) => {
                        let accessToken: string;

                        // Flag that we are done refreshing
                        this.isRefreshing = false;

                        // Pass the access token
                        if (tokenData) accessToken = tokenData.accessToken;
                        subscriber.next(accessToken);
                        subscriber.complete();
                        this.waitForAccessToken.next(accessToken);
                        this.waitForAccessToken.complete();
                    }, (error: HttpErrorResponse) => {
                        subscriber.error(error);
                        this.waitForAccessToken.next(null);
                    });
            } else {
                // Refreshing has already started, so we need to wait for the refreshing process to finish
                let subscription: Subscription = this.waitForAccessToken
                    .subscribe((accessToken: string) => {
                        // Pass the access token
                        subscriber.next(accessToken);
                        subscriber.complete();
                        subscription.unsubscribe();
                    });
            }
        });
    }

    isAccessTokenExpired(token: string): boolean {
        let jwtToken;

        // Make sure we don't get any errors while trying decode the token
        try {
            jwtToken = jwtDecode(token);
        } catch (error) {
            return true;
        }

        // Has token expired?
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


        // Set cookies on server
        if (Object.keys(response).length > 0) {
            let cookieOptions: any = {};

            // Set the options for the cookies
            if (jwtToken.isPersistent) cookieOptions.expires = this.cookieExpiration;
            cookieOptions.path = '/';

            response
                // Access cookie
                .cookie('access', accessToken, cookieOptions)

                // Refresh cookie
                .cookie('refresh', refreshToken, cookieOptions);

            // Set cookies on client
        } else {
            let expiration: string = jwtToken.isPersistent == 'True' ? '; expires=' + this.cookieExpiration.toUTCString() : '';

            // Access cookie
            document.cookie = 'access=' + accessToken + expiration + '; path=/';

            // Refresh cookie
            document.cookie = 'refresh=' + refreshToken + expiration + '; path=/';
        }
    }
}