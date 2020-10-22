import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'services/account.service';
import { Subscription } from 'rxjs';
import { RedirectService } from 'projects/website/src/app/services/redirect.service';
import { ContactUsService } from 'projects/website/src/app/services/contact-us.service';

@Component({
  selector: 'account-navigation',
  templateUrl: './account-navigation.component.html',
  styleUrls: ['./account-navigation.component.scss']
})
export class AccountNavigationComponent implements OnInit, OnDestroy {
  public dropdownItems: Array<any> = [];
  private subscription: Subscription;
  @Output() hide: EventEmitter<void> = new EventEmitter();

  constructor(private router: Router, private accountService: AccountService, private redirectService: RedirectService, private contactUsService: ContactUsService) { }

  ngOnInit() {
    this.subscription = this.accountService.isSignedIn.subscribe((isSignedIn: boolean) => {
      this.dropdownItems = [
        {
          caption: 'Sign In',
          url: 'sign-in',
          icon: 'fa-sign-in-alt',
          show: !isSignedIn,
          click: () => {
            this.redirectService.redirect = { path: location.pathname, queryParams: null }
          }
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
          url: 'account/lists',
          icon: 'fa-clipboard-list',
          show: true,
          click: () => { }
        },
        {
          caption: 'Your Profile',
          url: 'account/profile',
          icon: 'fa-address-card',
          show: true,
          click: () => { }
        },
        {
          caption: 'Email Preferences',
          url: 'account/email-preferences',
          icon: 'fa-envelope',
          show: true,
          click: () => { }
        },
        {
          caption: 'Contact Us',
          url: null,
          icon: 'fa-phone-alt',
          show: true,
          click: () => {
            this.contactUsService.show = true;
            this.hide.emit();
          }
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
    if(dropdownItem.url) {
      this.router.navigate([dropdownItem.url]);
    }
    
    dropdownItem.click();
  }

}
