import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { AccountService } from 'services/account.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountGuard implements CanActivate, CanLoad {
  private subscription: Subscription;

  constructor(private accountService: AccountService, private router: Router) { }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.isSignedIn().pipe(tap((signedIn: boolean) => {

      if (!signedIn) {
        // The customer is not signed in so we will loop through each segment to create the url for the redirect
        let url: string = '';
        for (let i = 0; i < segments.length; i++) {
          url += segments[i] + '/';
        }

        // Assign the redirect url and navigate to the sign in page
        this.accountService.redirectUrl = url;
        this.router.navigate(['sign-in']);
      }
    }));
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.isSignedIn().pipe(tap((signedIn: boolean) => {

      if (!signedIn) {
        // The customer is not signed in so assign the redirect url and navigate to the sign in page
        this.accountService.redirectUrl = state.url;
        this.router.navigate(['sign-in']);
      }
    }));
  }


  isSignedIn(): Observable<boolean> {
    return new Observable<boolean>((subscriber: Subscriber<boolean>) => {
      // Unsubscribe so we don't have multiple subscriptions
      if (this.subscription) this.subscription.unsubscribe();

      // Find out if the customer is signed in
      this.subscription = this.accountService.isSignedIn
        .subscribe((signedIn: boolean) => {
          subscriber.next(signedIn);
          subscriber.complete();
        });
    });
  }
}
