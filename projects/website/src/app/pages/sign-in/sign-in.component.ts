import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ValidationPageComponent } from '../validation-page/validation-page.component';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from 'services/data.service';
import { TokenData } from 'interfaces/token-data';
import { AuthService } from 'services/auth.service';
import { Account } from 'classes/account';
import { AccountService } from 'services/account.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent extends ValidationPageComponent implements OnInit {
  public account: Account = new Account();
  public error: string;
  private redirectUrl: string;

  constructor(
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document,
    @Inject(PLATFORM_ID) platformId: Object,
    public router: Router,
    private dataService: DataService,
    private authService: AuthService,
    private accountService: AccountService) {
    super(titleService, metaService, document, platformId);
  }


  ngOnInit() {
    this.title = 'Sign In';
    this.share = false;
    this.redirectUrl = this.accountService.redirectUrl;
    this.accountService.redirectUrl = '';
    this.account.isPersistent = true;
    super.ngOnInit();
  }

  submitData(): void {
    this.dataService.post('api/Account/SignIn', this.account)
      .subscribe((tokenData: TokenData) => {
        // Set the cookies and account
        this.authService.setCookies(tokenData.accessToken, tokenData.refreshToken);
        this.accountService.setAccount(this.redirectUrl);
      },
        error => {
          if (error.status == 409) {
            this.error = error.error;
          }
        });
  }

  onCreateAccountClick() {
    this.router.navigate(['/create-account']);
  }
}