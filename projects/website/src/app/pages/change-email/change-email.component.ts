import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { ValidationPageComponent } from '../validation-page/validation-page.component';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { Customer } from 'classes/customer';
import { AccountService } from 'services/account.service';
import { DataService } from 'services/data.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent extends ValidationPageComponent implements OnInit, OnDestroy {
  public currentEmail: string;
  public reEnteredEmail: string;
  public conflictError: string;
  public customer: Customer = new Customer();
  public _password: string;
  public _email: string;
  private subscription: Subscription;

  constructor(
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document: Document,
    @Inject(PLATFORM_ID) platformId: Object,
    private dataService: DataService,
    private accountService: AccountService,
    private router: Router) {
    super(titleService, metaService, document, platformId);
  }

  ngOnInit() {
    this.title = 'Change Email';
    this.share = false;
    super.ngOnInit();

    // Get customer info
    this.subscription = this.accountService.customer
      .subscribe((customer: Customer) => {
        this.customer = customer;
        if (this.customer) {
          this._email = this.currentEmail = customer.email;
        }
      });
  }

  onSubmit() {
    if (this.form.controls['newEmail'].value == this.currentEmail) {
      this.form.controls['newEmail'].setErrors({ emailMatch: true })
    }
    super.onSubmit();
  }


  submitData(): void {
    this.dataService.put('api/Account/UpdateEmail', {
      email: this._email,
      password: this._password
    })
      .subscribe(() => {
        // Update the customer's email
        this.customer.email = this._email;

        // Flag that the account has been updated and navigate back to the profile page
        this.accountService.accountUpdated = true;
        this.router.navigate(['account', 'profile']);
      },
        (errorResponse: HttpErrorResponse) => {
          if (errorResponse.status == 409) {
            this.conflictError = errorResponse.error;
          }
        });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
