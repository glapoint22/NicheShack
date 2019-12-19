import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';
import { FormsModule } from '@angular/forms';
import { ValidationPageModule } from '../validation-page/validation-page.module';


@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    SignInRoutingModule,
    FormsModule,
    ValidationPageModule
  ]
})
export class SignInModule { }
