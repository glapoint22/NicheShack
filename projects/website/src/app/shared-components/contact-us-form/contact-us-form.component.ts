import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { DataService } from 'services/data.service';
import { AccountService } from 'services/account.service';
import { Customer } from 'classes/customer';
import { ContactUsService } from '../../services/contact-us.service';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { ValidationPageComponent } from '../../pages/validation-page/validation-page.component';

@Component({
  selector: 'contact-us-form',
  templateUrl: './contact-us-form.component.html',
  styleUrls: ['./contact-us-form.component.scss']
})
export class ContactUsFormComponent extends ValidationPageComponent implements OnInit {
  constructor(
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document: Document,
    @Inject(PLATFORM_ID) platformId: Object,
    private dataService: DataService,
    private accountService: AccountService,
    public contactUsService: ContactUsService) {
    super(titleService, metaService, document, platformId);
  }

  public name: string;
  public email: string;
  public message: string;
  public sendButtonDisabled: boolean;
  private customer: Customer = new Customer();


  // -----------------------------( NG ON INIT )------------------------------ \\
  ngOnInit() {
    // Get customer info
    this.accountService.customer
      .subscribe((customer: Customer) => {
        this.customer = customer;
      });
  }


  // -----------------------------( ON SHOW )------------------------------ \\
  onShow() {
    this.setControls();
    this.sendButtonDisabled = true;
    this.name = this.customer != null ? this.customer.firstName : "";
    this.email = this.customer != null ? this.customer.email : "";
    this.message = "";
  }


  // -----------------------------( ON INPUT CHANGE )------------------------------ \\
  onInputChange() {
    this.sendButtonDisabled = this.name.length > 0 && this.email.length > 0 && this.message.length > 0 ? false : true;
  }


  // -----------------------------( SUBMIT DATA )------------------------------ \\
  submitData() {
    this.dataService.post('api/Notifications/Message', {
      name: this.name,
      email: this.email,
      message: this.message
    }).subscribe(() => this.contactUsService.show = false);
  }
}