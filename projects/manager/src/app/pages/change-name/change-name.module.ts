import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeNameRoutingModule } from './change-name-routing.module';
import { ChangeNameComponent } from './change-name.component';
import { ValidationPageModule } from '../validation-page/validation-page.module';
import { FormsModule } from '@angular/forms';
import { MenuBarModule } from '../../shared-components/menu-bar/menu-bar.module';
import { ContextMenuModule } from '../../shared-components/context-menu/context-menu.module';


@NgModule({
  declarations: [ChangeNameComponent],
  imports: [
    CommonModule,
    ChangeNameRoutingModule,
    ValidationPageModule,
    FormsModule,
    MenuBarModule,
    ContextMenuModule
  ]
})
export class ChangeNameModule { }
