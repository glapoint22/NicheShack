import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeNameRoutingModule } from './change-name-routing.module';
import { ChangeNameComponent } from './change-name.component';


@NgModule({
  declarations: [ChangeNameComponent],
  imports: [
    CommonModule,
    ChangeNameRoutingModule
  ]
})
export class ChangeNameModule { }
