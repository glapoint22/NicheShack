import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { AccountService } from './services/account.service';
import { mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private accountService: AccountService, @Inject(PLATFORM_ID) private platformId: Object) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token: string;

        if (isPlatformBrowser(this.platformId)) {

            // Grab the access token from the access cookie
            token = this.accountService.getAccessTokenFromCookie(document.cookie);

            // If we have an access token
            if (token) {
                // Check to see if the access token has expired
                if (this.accountService.isAccessTokenExpired(token)) {

                    // Here we are getting a new access token from the server. When it arrives, we continue
                    // with the pending api requests
                    if (req.url != 'api/Account/Refresh') { // Make sure the req url is not for refreshing the access token
                        return this.accountService.refresh().pipe(mergeMap((newAccessToken: string) => {
                            return next.handle(this.accountService.setHttpRequest(req, newAccessToken));
                        }));
                    }
                }
            }
        }
        return next.handle(this.accountService.setHttpRequest(req, token))
            .pipe(tap((event: any) => {
                if (isPlatformBrowser(this.platformId)) {
                    if (event instanceof HttpResponse) {
                        if (event.url == location.href + 'api/Account/Refresh') {
                            document.cookie = 'access=' + event.body.accessToken + '; expires=' + new Date(Date.now() + 1209600000).toUTCString();
                            document.cookie = 'refresh=' + event.body.refreshToken + '; expires=' + new Date(Date.now() + 1209600000).toUTCString();
                        }
                    }
                }

            }));
    }
}