import { Component, OnInit } from '@angular/core';
import { ValidationPageComponent } from '../validation-page/validation-page.component';
import { Customer } from 'classes/customer';

@Component({
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent extends ValidationPageComponent implements OnInit {
  public currentEmail: string;
  public reEnteredEmail: string;
  public conflictError: string;
  public customer: Customer = new Customer();
  public _password: string;
  public _email: string;

  ngOnInit() {
  }

}
