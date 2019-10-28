import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ValidationPageComponent } from '../validation-page/validation-page.component';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from 'services/data.service';
import { Account } from 'classes/account';

@Component({
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent extends ValidationPageComponent implements OnInit {
  public error: string;
  public account: Account = new Account();
  public reEnteredPassword: string;

  constructor(
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document,
    @Inject(PLATFORM_ID) platformId: Object,
    public router: Router,
    private dataService: DataService) {
    super(titleService, metaService, document, platformId);
  }

  ngOnInit() {
    this.title = 'Create Account';
    this.share = false;
    super.ngOnInit();
  }


  submitData(): void {
    this.dataService.post('api/Account/Register', this.account)
      .subscribe(() => { },
        error => {
          if (error.status == 409) {
            this.error = error.error;
          }
        });
  }

  onSignInClick() {
    this.router.navigate(['/sign-in']);
  }

}
