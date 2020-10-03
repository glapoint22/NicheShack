import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'services/account.service';

@Component({
  selector: 'account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.scss']
})
export class AccountActivationComponent implements OnInit {
  public email: string;

  constructor(
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    if (!this.accountService.email) {
      this.router.navigate(['']);
    } else {
      this.email = this.accountService.email;
      this.accountService.email = null;
    }
  }
}