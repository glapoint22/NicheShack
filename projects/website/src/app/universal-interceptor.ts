import { Injectable, Inject, Optional } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse, HttpEvent } from '@angular/common/http';
import { Request, Response } from 'express';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { AccountService } from './services/account.service';

// Needed to prevent "Refused to set unsafe header cookie"
import * as xhr2 from 'xhr2';
import { map } from 'rxjs/operators';
xhr2.prototype._restrictedHeaders = {};

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {

    constructor(@Optional() @Inject(REQUEST) protected request: Request, private accountService: AccountService, @Optional() @Inject(RESPONSE) protected response: Response) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let apiHost = 'http://localhost:50007/';
        let cookie: any = {};
        let authorization: string = '';

        if (this.request.headers.cookie) {
            let token = this.accountService.getAccessTokenFromCookie(this.request.headers.cookie);

            if (token) {
                authorization = 'Bearer ' + token;
            }

            cookie = this.request.headers.cookie;
        }


        return next.handle(req.clone(
            {
                url: apiHost + req.url,
                headers: new HttpHeaders({
                    cookie: cookie,
                    Authorization: authorization
                })
            }
        ))
            // .pipe(map((event: HttpEvent<any>) => {
            //     this.response.cookie();
            //     return event;
            // }));
    }
}