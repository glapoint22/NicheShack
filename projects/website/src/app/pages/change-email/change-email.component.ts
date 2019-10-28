import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ValidationPageComponent } from '../validation-page/validation-page.component';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { Customer } from 'classes/customer';
import { AccountService } from 'services/account.service';
import { DataService } from 'services/data.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent extends ValidationPageComponent implements OnInit {
  public oldEmail: string;
  public reEnteredEmail: string;
  public error: string;
  public customer: Customer = new Customer();
  public _password: string;
  private subscription: Subscription;

  constructor(
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document,
    @Inject(PLATFORM_ID) platformId: Object,
    private accountService: AccountService,
    private dataService: DataService,
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
        if (customer) this.oldEmail = customer.email;
      });
  }

  onSubmit() {
    if (this.form.controls['newEmail'].value == this.oldEmail) {
      this.form.controls['newEmail'].setErrors({ oldEmailMatch: true })
    }
    super.onSubmit();
  }


  submitData(): void {
    this.dataService.put('api/Account/UpdateEmail', { 
      email: this.customer.email,
      password: this._password
     })
      .subscribe(() => {
        // Flag that the account has been updated and navigate back to the profile page
        this.accountService.accountUpdated = true;
        this.router.navigate(['account', 'profile']);
      },
        error => {
          if (error.status == 409) {
            this.error = error.error;
          }
        });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
