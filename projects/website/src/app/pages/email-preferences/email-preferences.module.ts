import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailPreferencesRoutingModule } from './email-preferences-routing.module';
import { EmailPreferencesComponent } from './email-preferences.component';
import { HeaderFooterModule } from '../../shared-components/header-footer/header-footer.module';
import { CustomInputModule } from 'shared-components/custom-input/custom-input.module';


@NgModule({
  declarations: [EmailPreferencesComponent],
  imports: [
    CommonModule,
    EmailPreferencesRoutingModule,
    HeaderFooterModule,
    CustomInputModule
  ]
})
export class EmailPreferencesModule { }
