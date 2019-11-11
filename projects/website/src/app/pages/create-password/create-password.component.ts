import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ValidationPageComponent } from '../validation-page/validation-page.component';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from 'services/data.service';

@Component({
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent extends ValidationPageComponent implements OnInit {
  public reEnteredPassword: string;
  public password: string;
  public success: boolean;

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
    this.title = 'Create New Password';
    this.share = false;
    super.ngOnInit();
  }

  submitData(): void {
    this.success = true;
  }

}
