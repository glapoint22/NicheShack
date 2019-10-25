import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { mergeMap, tap } from 'rxjs/operators';
import { AuthService } from 'services/auth.service';

@Injectable()
export class ClientInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, @Inject(PLATFORM_ID) private platformId: Object) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token: string;

        if (isPlatformBrowser(this.platformId)) {

            // Grab the access token from the access cookie
            token = this.authService.getAccessTokenFromCookie(document.cookie);

            // We don't need to run this code if the request is for refreshing the access token
            if (req.url != this.authService.refreshUrl) {
                // If we have an access token
                if (token) {
                    // Check to see if the access token has expired
                    if (this.authService.isAccessTokenExpired(token)) {

                        // Here we are getting a new access token from the server. When it arrives, we continue
                        // with the pending api requests
                        return this.authService.refresh().pipe(mergeMap((accessToken: string) => {
                            return next.handle(this.authService.setHttpRequest(req, accessToken));
                        }));
                    }
                }
            }


        }
        return next.handle(this.authService.setHttpRequest(req, token))
            .pipe(tap((event: HttpEvent<any>) => {
                // Make sure we only run this on the client
                if (isPlatformBrowser(this.platformId)) {
                    if (event instanceof HttpResponse) {

                        // Set the cookies if the response is from the token refresh
                        if (event.url == location.origin + '/' + this.authService.refreshUrl && event.body) {
                            this.authService.setCookies(event.body.accessToken, event.body.refreshToken);
                        }
                    }
                }
            }));
    }
}