import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxItemListComponent } from './checkbox-item-list.component';
import { CustomInputModule } from 'shared-components/custom-input/custom-input.module';



@NgModule({
  declarations: [
    CheckboxItemListComponent
  ],
  imports: [
    CommonModule,
    CustomInputModule
  ],
  exports: [
    CheckboxItemListComponent
  ]
})
export class CheckboxItemListModule { }
