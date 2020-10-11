import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataService } from 'services/data.service';
import { ValidationPageComponent } from '../validation-page/validation-page.component';

@Component({
  selector: 'new-email',
  templateUrl: './new-email.component.html',
  styleUrls: ['./new-email.component.scss']
})
export class NewEmailComponent extends ValidationPageComponent implements OnInit {
  public emailAddress: string;
  public emailSent: boolean;
  public error: boolean;


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
    this.title = 'New Email';
    super.ngOnInit();
  }

  submitData(): void {
    this.dataService.get('api/Account/NewEmail', [{ key: 'email', value: this.emailAddress }])
      .subscribe(() => {
        this.emailSent = true;
        this.error = false;
      }, (error: HttpErrorResponse) => {
        if(error.status == 409) {
          this.error = true;
        }
      });
  }
}