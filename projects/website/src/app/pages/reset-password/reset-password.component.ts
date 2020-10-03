import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'services/data.service';
import { ValidationPageComponent } from '../validation-page/validation-page.component';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends ValidationPageComponent implements OnInit {
  public password: string;
  public reEnteredPassword: string;
  public success: boolean;

  constructor(
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document: Document,
    @Inject(PLATFORM_ID) platformId: Object,
    private dataService: DataService,
    public router: Router,
    public route: ActivatedRoute) {
    super(titleService, metaService, document, platformId);
  }

  ngOnInit() {
    if (!this.route.snapshot.queryParams.email || !this.route.snapshot.queryParams.token) {
      this.router.navigate(['']);
    } else {
      this.title = 'Create Account';
      super.ngOnInit();
    }
  }


  submitData(): void {
    this.dataService.post('api/Account/ResetPassword', {
      token: this.route.snapshot.queryParams.token,
      email: this.route.snapshot.queryParams.email,
      password: this.password
    }).subscribe(() => {
      this.success = true;
    });
  }
}