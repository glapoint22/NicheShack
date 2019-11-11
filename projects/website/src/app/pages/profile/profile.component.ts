import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { PageComponent } from '../page/page.component';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer } from 'classes/customer';
import { AccountService } from 'services/account.service';
import { DataService } from 'services/data.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends PageComponent implements OnInit, OnDestroy {
  public accountUpdated: boolean;
  public customer: Customer = new Customer();
  private subscription: Subscription;

  constructor(
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document: Document,
    dataService: DataService,
    private router: Router,
    private accountService: AccountService) {
    super(titleService, metaService, document, dataService);
  }

  ngOnInit() {
    this.title = 'Profile';
    this.share = false;
    super.ngOnInit();

    // Flag if account has been updated
    this.accountUpdated = this.accountService.accountUpdated;
    this.accountService.accountUpdated = false;

    // Get customer info
    this.subscription = this.accountService.customer
      .subscribe((customer: Customer) => {
        this.customer = customer;
      });
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
