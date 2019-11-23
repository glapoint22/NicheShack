import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateListComponent } from './create-list.component';
import { ShowHideModule } from '../../directives/show-hide/show-hide.module';
import { FormsModule } from '@angular/forms';



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
