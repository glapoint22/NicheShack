import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ValidationPageComponent } from '../validation-page/validation-page.component';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from 'services/data.service';

@Component({
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent extends ValidationPageComponent implements OnInit {
  public emailAddress: string;
  public emailSent: boolean;


  constructor(
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document: Document,
    @Inject(PLATFORM_ID) platformId: Object,
    public router: Router,
    private dataService: DataService
  ) {
    super(titleService, metaService, document, platformId);
  }

  ngOnInit() {
    this.title = 'Forgot Password';
    super.ngOnInit();
  }

  submitData(): void {
    this.dataService.get('api/Account/ForgetPassword', [{ key: 'email', value: this.emailAddress }])
      .subscribe(() => {
        this.emailSent = true;
      });
  }
}