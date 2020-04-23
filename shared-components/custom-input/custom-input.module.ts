import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { CustomInputComponent } from './custom-input.component';
import { CheckboxComponent } from './checkbox/checkbox.component';



@NgModule({
  declarations: [
    CustomInputComponent,
    RadioButtonComponent,
    CheckboxComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CustomInputComponent,
    RadioButtonComponent,
    CheckboxComponent
  ]
})
export class CustomInputModule { }
