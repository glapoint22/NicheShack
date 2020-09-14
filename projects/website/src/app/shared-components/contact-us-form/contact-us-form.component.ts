import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'services/data.service';
import { AccountService } from 'services/account.service';
import { Subscription } from 'rxjs';
import { Customer } from 'classes/customer';
import { ContactUsService } from '../../services/contact-us.service';

@Component({
  selector: 'contact-us-form',
  templateUrl: './contact-us-form.component.html',
  styleUrls: ['./contact-us-form.component.scss']
})
export class ContactUsFormComponent implements OnInit {
  constructor(private dataService: DataService, private accountService: AccountService, public contactUsService: ContactUsService) { }

  private subscription: Subscription;
  private customer: Customer = new Customer();

  @ViewChild('nameInput', { static: false }) nameInput: ElementRef<HTMLInputElement>;
  @ViewChild('emailInput', { static: false }) emailInput: ElementRef<HTMLInputElement>;
  @ViewChild('messageInput', { static: false }) messageInput: ElementRef<HTMLInputElement>;

  ngOnInit() {
    // Get customer info
    this.subscription = this.accountService.customer
      .subscribe((customer: Customer) => {

        this.customer = customer;
      });
  }


  onShow(){
    if (this.customer != null) {
      (document.getElementById("nameInput") as HTMLInputElement).value = this.customer.firstName + " " + this.customer.lastName;
      (document.getElementById("emailInput") as HTMLInputElement).value = this.customer.email;
    }
  }

  onCancelButtonClick() {
    
  }


  onSendButtonClick() {
    this.dataService.post('api/Notifications/Message', {
      name: this.nameInput.nativeElement.value,
      email: this.emailInput.nativeElement.value,
      message: this.messageInput.nativeElement.value
    }).subscribe();
  }
}