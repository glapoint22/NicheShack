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
    public redirectUrl: string = '';
    public accountUpdated: boolean;

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
            }, () => {
                this.customer.next(null);
                this.customer.complete();
                this.isSignedIn.next(true);
                this.isSignedIn.complete();
            });
    }
}
