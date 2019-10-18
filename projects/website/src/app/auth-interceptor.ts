import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { AccountService } from './services/account.service';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private accountService: AccountService, @Inject(PLATFORM_ID) private platformId: Object) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        

        if (isPlatformBrowser(this.platformId)) {
            let token = this.accountService.getAccessTokenFromCookie(document.cookie);
            if (token) {
                req = req.clone({
                    headers: new HttpHeaders({
                        Authorization: 'Bearer ' + token
                    })
                });
            }

            if(req.url != 'api/Account/Refresh') {
                return this.accountService.refresh().pipe(mergeMap(() => {
                    return next.handle(req);
                }));
            }

            
        }


        return next.handle(req);
    }
}