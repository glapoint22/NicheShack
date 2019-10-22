import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { AccountService } from 'services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AccountGuard implements CanActivate, CanLoad {

  constructor(private accountService: AccountService, private router: Router) { }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.isSignedIn(() => {

      // The customer is not signed in so we will loop through each segment to create the url for the redirect
      let url: string = '';
      for (let i = 0; i < segments.length; i++) {
        url += segments[i] + '/';
      }

      // Assign the redirect url and navigate to the sign in page
      this.accountService.redirectUrl = url;
      this.router.navigate(['sign-in']);
    });
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.isSignedIn(() => {

      // The customer is not signed in so assign the redirect url and navigate to the sign in page
      this.accountService.redirectUrl = state.url;
      this.router.navigate(['sign-in'])
    });
  }


  isSignedIn(callback: Function): Observable<boolean> {
    return new Observable<boolean>((subscriber: Subscriber<boolean>) => {

      // Find out if the customer is signed in
      this.accountService.isSignedIn
        .subscribe((signedIn: boolean) => {
          subscriber.next(signedIn);
          subscriber.complete();

          // If not signed in, call the callback function
          if (!signedIn) callback();
        });
    });
  }
}
