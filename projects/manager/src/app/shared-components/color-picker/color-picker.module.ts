import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerComponent } from './color-picker.component';
import { FormsModule } from '@angular/forms'
import { ShowHideModule } from 'directives/show-hide/show-hide.module';
import { DialogBoxModule } from '../dialog-box/dialog-box.module';


@NgModule({
  declarations: [ColorPickerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ShowHideModule,
    DialogBoxModule
  ],
  exports: [ColorPickerComponent]
})
export class ColorPickerModule { }
