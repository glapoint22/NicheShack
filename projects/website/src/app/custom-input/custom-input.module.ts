import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { CustomInputComponent } from './custom-input.component';



@NgModule({
  declarations: [
    CustomInputComponent,
    RadioButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CustomInputComponent,
    RadioButtonComponent
  ]
})
export class CustomInputModule { }
