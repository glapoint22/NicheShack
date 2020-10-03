import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { DataService } from 'services/data.service';
import { Customer } from 'classes/customer';
import { Router } from '@angular/router';
import { Redirect } from 'projects/website/src/app/classes/redirect';
import { SignInData } from 'projects/website/src/app/classes/sign-in-data';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})

export class AccountService {
    public customer = new ReplaySubject<Customer>(1);
    public isSignedIn = new ReplaySubject<boolean>(1);
    public accountUpdated: boolean;
    public email: string;

    constructor(private dataService: DataService, private router: Router, private authService: AuthService) {
        this.dataService.get('api/Account/GetCustomer')
            .subscribe((customer: Customer) => {
                this.setAccount(customer);
            });


    }


    public signIn(signInData: SignInData, redirect: Redirect) {
        // Set the cookies and account
        this.authService.setCookies(signInData.tokenData.accessToken, signInData.tokenData.refreshToken);
        this.setAccount(signInData.customer, redirect);
    }


    public signOut() {
        // This will delete the refresh token in the database and delete the access and refresh cookies
        this.dataService.get('api/Account/SignOut').subscribe(() => { });

        // Set the customer to a null value and flag that we are no longer signed in
        this.customer.next(null);
        this.isSignedIn.next(false);
    }



    public setAccount(customer: Customer, redirect: Redirect = null) {
        this.customer.next(customer);
        this.isSignedIn.next(customer != null);
        if (redirect != null) {
            this.router.navigate([redirect.path], { queryParams: redirect.queryParams });
        }
    }
}