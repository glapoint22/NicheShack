import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { ValidationPageComponent } from '../validation-page/validation-page.component';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer } from 'classes/customer';
import { AccountService } from 'services/account.service';
import { DataService } from 'services/data.service';

@Component({
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent extends ValidationPageComponent implements OnInit, OnDestroy {
  public email: string;
  public conflictError: string;
  public resentCode: boolean;
  public code: string;
  private subscription: Subscription;

  constructor(
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document: Document,
    dataService: DataService,
    @Inject(PLATFORM_ID) platformId: Object,
    public router: Router,
    private accountService: AccountService) {
    super(titleService, metaService, document, dataService, platformId);
  }

  ngOnInit() {
    this.title = 'Verification';
    this.share = false;
    super.ngOnInit();

    // Get customer info
    this.subscription = this.accountService.customer
      .subscribe((customer: Customer) => {
        this.email = customer.email;
      });
  }

  submitData(): void {
    this.conflictError = 'You\'ve entered an invalid code. Please try again.';
    this.resentCode = false;
  }

  onResendCodeClick() {
    this.resentCode = true;
    this.conflictError = null;
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
