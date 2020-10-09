import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewEmailRoutingModule } from './new-email-routing.module';
import { NewEmailComponent } from './new-email.component';
import { FormsModule } from '@angular/forms';
import { HeaderFooterModule } from '../../shared-components/header-footer/header-footer.module';


@NgModule({
  declarations: [NewEmailComponent],
  imports: [
    CommonModule,
    NewEmailRoutingModule,
    FormsModule,
    HeaderFooterModule
  ]
})
export class NewEmailModule { }
