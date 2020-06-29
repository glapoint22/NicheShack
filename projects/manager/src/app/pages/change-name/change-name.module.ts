import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeNameRoutingModule } from './change-name-routing.module';
import { ChangeNameComponent } from './change-name.component';
import { ValidationPageModule } from '../validation-page/validation-page.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ChangeNameComponent],
  imports: [
    CommonModule,
    ChangeNameRoutingModule,
    ValidationPageModule,
    FormsModule
  ]
})
export class ChangeNameModule { }
