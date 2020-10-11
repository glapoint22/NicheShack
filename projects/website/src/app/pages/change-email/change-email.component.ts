import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { ValidationPageComponent } from '../validation-page/validation-page.component';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { Customer } from 'classes/customer';
import { AccountService } from 'services/account.service';
import { DataService } from 'services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent extends ValidationPageComponent implements OnInit, OnDestroy {
  public previousEmail: string;
  public newEmail: string;
  public token: string;
  // public reEnteredEmail: string;
  public conflictError: string;
  public customer: Customer = new Customer();
  public _password: string;
  // public _email: string;
  private subscription: Subscription;

  constructor(
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document: Document,
    @Inject(PLATFORM_ID) platformId: Object,
    private dataService: DataService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute) {
    super(titleService, metaService, document, platformId);
  }

  ngOnInit() {
    this.title = 'Change Email';
    super.ngOnInit();

    this.newEmail = this.route.snapshot.queryParams.email;
    this.token = this.route.snapshot.queryParams.token

    if(!this.token || !this.newEmail) {
      this.router.navigate(['']);
      return;
    }

    // Get customer info
    this.subscription = this.accountService.customer
      .subscribe((customer: Customer) => {
        this.customer = customer;
        if (this.customer) {
          this.previousEmail = customer.email;
        }
      });
  }

  // onSubmit() {
  //   if (this.form.controls['newEmail'].value == this.previousEmail) {
  //     this.form.controls['newEmail'].setErrors({ emailMatch: true })
  //   }
  //   super.onSubmit();
  // }


  
  // (errorResponse: HttpErrorResponse) => {
  //   if (errorResponse.status == 409) {
  //     this.conflictError = errorResponse.error;
  //   }
  // }
  

  submitData(): void {
    this.dataService.put('api/Account/UpdateEmail', {
      email: this.newEmail,
      password: this._password,
      token: this.token
    })
      .subscribe(() => {
        // Update the customer's email
        this.customer.email = this.newEmail;

        // Flag that the account has been updated and navigate back to the profile page
        this.accountService.accountUpdated = true;
        this.router.navigate(['account', 'profile']);
      }, (errorResponse: HttpErrorResponse)=> {
        this.conflictError = errorResponse.error;
      });
  }


  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }

}
