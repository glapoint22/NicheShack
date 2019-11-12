import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollaborateListRoutingModule } from './collaborate-list-routing.module';
import { CollaborateListComponent } from './collaborate-list.component';


@NgModule({
  declarations: [CollaborateListComponent],
  imports: [
    CommonModule,
    CollaborateListRoutingModule
  ]
})
export class CollaborateListModule { }
