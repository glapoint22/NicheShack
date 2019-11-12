import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'services/account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'account-navigation',
  templateUrl: './account-navigation.component.html',
  styleUrls: ['./account-navigation.component.scss']
})
export class AccountNavigationComponent implements OnInit, OnDestroy {
  public dropdownItems: Array<any> = [];
  private subscription: Subscription;

  constructor(private router: Router, private accountService: AccountService) { }

  ngOnInit() {
    this.subscription = this.accountService.isSignedIn.subscribe((isSignedIn: boolean) => {
      this.dropdownItems = [
        {
          caption: 'Sign In',
          url: 'sign-in',
          icon: 'fa-sign-in-alt',
          show: !isSignedIn,
          click: () => { }
        },
        {
          caption: 'Your Account',
          url: 'account',
          icon: 'fa-user',
          show: true,
          click: () => { }
        },
        {
          caption: 'Your Orders',
          url: 'account/orders',
          icon: 'fa-file-invoice',
          show: true,
          click: () => { }
        },
        {
          caption: 'Your Lists',
          url: 'lists',
          icon: 'fa-clipboard-list',
          show: true,
          click: () => { }
        },
        {
          caption: 'Your Email Subscriptions',
          url: 'email-subscriptions',
          icon: 'fa-envelope',
          show: true,
          click: () => { }
        },
        {
          caption: 'Sign Out',
          url: 'sign-in',
          icon: 'fa-sign-out-alt',
          show: isSignedIn,
          click: () => this.accountService.signOut()
        },
        {
          caption: 'Create Account',
          url: 'create-account',
          icon: 'fa-user-plus',
          show: !isSignedIn,
          click: () => { }
        }
      ];
    });


  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClick(dropdownItem: any) {
    this.router.navigate([dropdownItem.url]);
    dropdownItem.click();
  }

}
