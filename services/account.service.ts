import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { DataService } from 'services/data.service';
import { Customer } from 'classes/customer';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AccountService {
    public customer = new ReplaySubject<Customer>(1);
    public isSignedIn = new ReplaySubject<boolean>(1);

    // redirectUrl
    private _redirectUrl: string;
    public get redirectUrl(): string {
        let url: string;

        // if _redirectUrl is null, assign url an empty string. This will redirect to the home page
        if (!this._redirectUrl) {
            url = ''
        } else {
            // We have a path to redirct to, so give it to url
            url = this._redirectUrl;

            // Clear so we don't redirect again
            this._redirectUrl = null;
        }

        return url;
    }
    public set redirectUrl(v: string) {
        // Set the value
        this._redirectUrl = v;
    }


    constructor(private dataService: DataService, private router: Router) {
        this.setAccount();
    }


    public signOut() {
        // This will delete the refresh token in the database and delete the access and refresh cookies
        this.dataService.get('api/Account/SignOut').subscribe(() => { });

        // Set the customer to a null value and flag that we are no longer signed in
        this.customer.next(null);
        this.isSignedIn.next(false);
    }

    public setAccount(redirectUrl: string = null) {
        // This will get the customer from the database setting firstName, lastName, and email
        // If the customer returns null, this means the customer is not signed in or doesn't have an account
        this.dataService.get('api/Account/GetCustomer')
            .subscribe((customer: Customer) => {
                this.customer.next(customer);
                this.isSignedIn.next(customer != null);
                if (redirectUrl != null) this.router.navigate([redirectUrl]);
            });
    }
}
