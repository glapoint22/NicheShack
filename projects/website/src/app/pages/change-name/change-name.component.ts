import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { ValidationPageComponent } from '../validation-page/validation-page.component';
import { Customer } from 'classes/customer';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { AccountService } from 'services/account.service';
import { DataService } from 'services/data.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './change-name.component.html',
  styleUrls: ['./change-name.component.scss']
})
export class ChangeNameComponent extends ValidationPageComponent implements OnInit, OnDestroy {
  public _firstName: string;
  public _lastName: string;
  private customer: Customer = new Customer();
  private subscription: Subscription;

  constructor(
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document: Document,
    @Inject(PLATFORM_ID) platformId: Object,
    private accountService: AccountService,
    private dataService: DataService,
    private router: Router) {
    super(titleService, metaService, document, platformId);
  }

  ngOnInit() {
    this.title = 'Change Name';
    super.ngOnInit();

    // Get customer info
    this.subscription = this.accountService.customer
      .subscribe((customer: Customer) => {
        this.customer = customer;
        if (this.customer) {
          this._firstName = this.customer.firstName;
          this._lastName = this.customer.lastName;
        }
      });
  }


  submitData(): void {
    this.dataService.put('api/Account/UpdateName', {
      firstName: this._firstName,
      lastName: this._lastName,
    })
      .subscribe(() => {
        // Update the customer's name
        this.customer.firstName = this._firstName;
        this.customer.lastName = this._lastName;

        // Flag that the account has been updated and navigate back to the profile page
        this.accountService.accountUpdated = true;
        this.router.navigate(['account', 'profile']);
      });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}