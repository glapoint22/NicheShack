import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'account-navigation',
  templateUrl: './account-navigation.component.html',
  styleUrls: ['./account-navigation.component.scss']
})
export class AccountNavigationComponent implements OnInit {
  @Input() show: boolean;
  @Input() showHideElement: HTMLElement;
  public dropdownItems: Array<any>;

  constructor(private router: Router) { }

  ngOnInit() {
    this.dropdownItems = [
      {
        caption: 'Sign In',
        url: 'sign-in',
        icon: 'fa-sign-in-alt'
      },
      {
        caption: 'Your Account',
        url: 'account',
        icon: 'fa-user'
      },
      {
        caption: 'Your Orders',
        url: 'account/orders',
        icon: 'fa-file-invoice'
      },
      {
        caption: 'Your Lists',
        url: 'lists',
        icon: 'fa-clipboard-list'
      },
      {
        caption: 'Your Email Preferences',
        url: 'preferences',
        icon: 'fa-envelope'
      },
      {
        caption: 'Sign Out',
        url: 'sign-out',
        icon: 'fa-sign-out-alt'
      },
      {
        caption: 'Create Account',
        url: 'create-account',
        icon: 'fa-user-plus'
      }
    ];
  }

  onClick(dropdownItem: any) {
    this.router.navigate([dropdownItem.url]);
    this.showHideElement.blur();
  }

}
