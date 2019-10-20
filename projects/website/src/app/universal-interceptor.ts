import { Injectable, Inject, Optional } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Request, Response } from 'express';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { AccountService } from './services/account.service';
import { mergeMap, tap } from 'rxjs/operators';

// Needed to prevent "Refused to set unsafe header cookie"
import * as xhr2 from 'xhr2';
xhr2.prototype._restrictedHeaders = {};

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {

    constructor(@Optional() @Inject(REQUEST) protected request: Request, private accountService: AccountService, @Optional() @Inject(RESPONSE) protected response: Response) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let apiUrl = 'http://localhost:50007/';
        let token: string;

        token = this.accountService.getAccessTokenFromCookie(this.request.headers.cookie);

        if (token) {
            // Check to see if the access token has expired
            if (this.accountService.isAccessTokenExpired(token)) {


                // Here we are getting a new access token from the server. When it arrives, we continue
                // with the pending api requests
                if (req.url != 'api/Account/Refresh') {
                    return this.accountService.refresh().pipe(mergeMap((accessToken: string) => {
                        return next.handle(this.accountService.setHttpRequest(req, accessToken, this.request.headers.cookie, apiUrl));
                    }));
                }
            }
        }


        return next.handle(this.accountService.setHttpRequest(req, token, this.request.headers.cookie, apiUrl))
            .pipe(tap((event: any) => {
                if (event instanceof HttpResponse) {
                    if (event.url == apiUrl + 'api/Account/Refresh') {
                        this.response
                            .cookie('access', event.body.accessToken, {
                                expires: new Date(Date.now() + 1209600000)
                            })
                            .cookie('refresh', event.body.refreshToken, {
                                expires: new Date(Date.now() + 1209600000)
                            });
                    }
                }
            }));
    }
}