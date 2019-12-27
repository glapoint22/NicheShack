import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateListComponent } from './create-list.component';
import { FormsModule } from '@angular/forms';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';



@NgModule({
  declarations: [CreateListComponent],
  imports: [
    CommonModule,
    ShowHideModule,
    FormsModule
  ],
  exports: [CreateListComponent]
})
export class CreateListModule { }
