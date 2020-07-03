import { Component, OnInit } from '@angular/core';
import { ValidationPageComponent } from '../validation-page/validation-page.component';
import { Account } from 'classes/account';

@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent extends ValidationPageComponent implements OnInit {
  public account: Account = new Account();
  public conflictError: string;

  ngOnInit() {
  }

  submitData() {

  }

}
