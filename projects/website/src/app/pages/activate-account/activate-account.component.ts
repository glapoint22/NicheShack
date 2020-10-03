import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'services/account.service';
import { DataService } from 'services/data.service';
import { SignInData } from '../../classes/sign-in-data';
import { RedirectService } from '../../services/redirect.service';

@Component({
  selector: 'activate-account',
  template: ''
})
export class ActivateAccountComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private redirectService: RedirectService,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit() {
    let email = this.route.snapshot.queryParams.email;
    let token = this.route.snapshot.queryParams.token;

    if (!email || !token) {
      this.router.navigate(['']);
    } else {
      this.dataService.post("api/Account/ActivateAccount",
        {
          email: email,
          token: token
        }
      ).subscribe((signInData: SignInData) => {
        if (!signInData) {
          this.router.navigate(['']);
        } else {
          this.redirectService.redirect = { path: '', queryParams: null };

          // Sign in
          this.accountService.signIn(signInData, this.redirectService.redirect);
        }
      });
    }
  }
}