import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ValidationPageComponent } from '../validation-page/validation-page.component';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from 'services/data.service';
import { AccountService } from 'services/account.service';

@Component({
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends ValidationPageComponent implements OnInit {
  public currentPassword: string;
  public newPassword: string;
  public reEnteredPassword: string;

  constructor(
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document: Document,
    @Inject(PLATFORM_ID) platformId: Object,
    private dataService: DataService,
    private router: Router,
    private accountService: AccountService) { super(titleService, metaService, document, platformId); }

  ngOnInit() {
    this.title = 'Change Password';
    super.ngOnInit();
  }

  submitData(): void {
    this.dataService
      .put('api/Account/UpdatePassword', {
        currentPassword: this.currentPassword,
        newPassword: this.newPassword
      })
      .subscribe(() => {
        // Flag that the account has been updated and navigate back to the profile page
        this.accountService.accountUpdated = true;
        this.router.navigate(['account', 'profile']);
      }, error => {
        if (error.status == 409) {
          //password is incorrect
          this.form.controls['currentPassword'].setErrors({ incorrectPassword: true });
          this.onSubmit();
        }
      });
  }
}