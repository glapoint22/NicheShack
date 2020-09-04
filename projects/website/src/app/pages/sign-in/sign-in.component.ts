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
import { HttpErrorResponse } from '@angular/common/http';
import { RedirectService } from '../../services/redirect.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent extends ValidationPageComponent implements OnInit {
  public account: Account = new Account();
  public conflictError: string;

  constructor(
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document: Document,
    @Inject(PLATFORM_ID) platformId: Object,
    public router: Router,
    private authService: AuthService,
    private dataService: DataService,
    private accountService: AccountService,
    private redirectService: RedirectService
  ) {
    super(titleService, metaService, document, platformId);
  }


  ngOnInit() {
    this.title = 'Sign In';
    this.account.isPersistent = true;
    super.ngOnInit();
  }

  submitData(): void {
    this.dataService.post('api/Account/SignIn', this.account)
      .subscribe((tokenData: TokenData) => {
        // Set the cookies and account
        this.authService.setCookies(tokenData.accessToken, tokenData.refreshToken);
        this.accountService.setAccount(this.redirectService.redirect);
      },
        (errorResponse: HttpErrorResponse) => {
          if (errorResponse.status == 409) {
            this.conflictError = errorResponse.error;
          }
        });
  }

  onCreateAccountClick() {
    this.router.navigate(['/create-account']);
  }
}