import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { mergeMap, tap } from 'rxjs/operators';
import { AuthService } from 'services/auth.service';
import { DataService } from 'services/data.service';

@Injectable()
export class ClientInterceptor implements HttpInterceptor {
    // private requestCount: number;

    constructor(private authService: AuthService, @Inject(PLATFORM_ID) private platformId: Object, private dataService: DataService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token: string;

        if (isPlatformBrowser(this.platformId)) {
            // // Flag that we are loading
            // if(!this.dataService.loading) this.requestCount = 0;
            // this.requestCount++;
            // this.dataService.loading = true;

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
                            // // Set loading to false when requests are complete
                            // this.requestCount--;
                            // if (this.requestCount == 0) {
                            //     this.dataService.loading = false;
                            // }
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

                        // // Set loading to false when requests are complete
                        // this.requestCount--;
                        // if (this.requestCount == 0) {
                        //     this.dataService.loading = false;
                        // }


                        // Set the cookies if the response is from the token refresh
                        if (event.url == location.origin + '/' + this.authService.refreshUrl && event.body) {
                            this.authService.setCookies(event.body.accessToken, event.body.refreshToken);
                        }
                    }
                }
            }));
    }
}