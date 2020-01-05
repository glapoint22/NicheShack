import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerComponent } from './color-picker.component';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [ColorPickerComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ColorPickerComponent]
})
export class ColorPickerModule { }
