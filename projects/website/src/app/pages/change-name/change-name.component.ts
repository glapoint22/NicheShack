import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
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
export class ChangeNameComponent extends ValidationPageComponent implements OnInit {
  public customer: Customer = new Customer();
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
    this.title = 'Change Name';
    this.share = false;
    super.ngOnInit();

    // Get customer info
    this.subscription = this.accountService.customer
      .subscribe((customer: Customer) => {
        this.customer = customer;
      });
  }


  submitData(): void {
    this.dataService.put('api/Account/UpdateName', this.customer)
      .subscribe(() => {
        // Flag that the account has been updated and navigate back to the profile page
        this.accountService.accountUpdated = true;
        this.router.navigate(['account', 'profile']);
      });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}