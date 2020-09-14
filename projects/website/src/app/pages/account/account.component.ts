import { Component, OnInit, Inject } from '@angular/core';
import { PageComponent } from '../page/page.component';
import { ContactUsService } from '../../services/contact-us.service';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Component({
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends PageComponent implements OnInit {
  constructor(titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document: Document, private contactUsService: ContactUsService) {
    super(titleService, metaService, document);
   }

  ngOnInit() {
    this.title = 'Your Account';
    super.ngOnInit();
  }

  onContactUsIconClick() {
    this.contactUsService.show = true;
  }
}