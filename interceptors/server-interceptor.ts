import { Injectable, Inject, Optional } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Request, Response } from 'express';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { mergeMap, tap } from 'rxjs/operators';
import * as proxyConfig from '../proxy.config';

// Needed to prevent "Refused to set unsafe header cookie"
import * as xhr2 from 'xhr2';
import { AuthService } from 'services/auth.service';
xhr2.prototype._restrictedHeaders = {};

@Injectable()
export class ServerInterceptor implements HttpInterceptor {

    constructor(@Optional() @Inject(REQUEST) protected request: Request, private authService: AuthService, @Optional() @Inject(RESPONSE) protected response: Response) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let token: string;

        // Grab the access token from the access cookie
        token = this.authService.getAccessTokenFromCookie(this.request.headers.cookie);

        // We don't need to run this code if the request is for refreshing the access token
        if (req.url != this.authService.refreshUrl) {
            if (token) {
                // Check to see if the access token has expired
                if (this.authService.isAccessTokenExpired(token)) {
                    // Here we are getting a new access token from the server. When it arrives, we continue
                    // with the pending api requests
                    return this.authService.refresh().pipe(mergeMap((accessToken: string) => {
                        return next.handle(this.authService.setHttpRequest(req, accessToken, this.request.headers.cookie, proxyConfig[0].target));
                    }));
                }
            }
        }


        return next.handle(this.authService.setHttpRequest(req, token, this.request.headers.cookie, proxyConfig[0].target))
            .pipe(tap((event: any) => {
                if (event instanceof HttpResponse) {
                    // Set the cookies if the response is from the token refresh
                    if (event.url == proxyConfig[0].target + this.authService.refreshUrl && event.body) {
                        this.authService.setCookies(event.body.accessToken, event.body.refreshToken, this.response);
                    }
                }
            }));
    }
}