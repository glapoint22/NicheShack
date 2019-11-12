import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedListRoutingModule } from './shared-list-routing.module';
import { SharedListComponent } from './shared-list.component';


@NgModule({
  declarations: [SharedListComponent],
  imports: [
    CommonModule,
    SharedListRoutingModule
  ]
})
export class SharedListModule { }
