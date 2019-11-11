import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ValidationPageComponent } from '../validation-page/validation-page.component';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from 'services/data.service';
import { Account } from 'classes/account';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent extends ValidationPageComponent implements OnInit {
  public conflictError: string;
  public account: Account = new Account();
  public reEnteredPassword: string;

  constructor(
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document: Document,
    dataService: DataService,
    @Inject(PLATFORM_ID) platformId: Object,
    public router: Router) {
    super(titleService, metaService, document, dataService, platformId);
  }

  ngOnInit() {
    this.title = 'Create Account';
    this.share = false;
    super.ngOnInit();
  }


  submitData(): void {
    this.dataService.post('api/Account/Register', this.account)
      .subscribe(() => { },
        (errorResponse: HttpErrorResponse) => {
          if (errorResponse.status == 409) {
            this.conflictError = errorResponse.error;
          }
        });
  }

  onSignInClick() {
    this.router.navigate(['/sign-in']);
  }

}
