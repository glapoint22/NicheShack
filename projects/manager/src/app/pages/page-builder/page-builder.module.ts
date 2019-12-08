import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageBuilderRoutingModule } from './page-builder-routing.module';
import { PageBuilderComponent } from './page-builder.component';
import { MenuBarModule } from '../../shared-components/menu-bar/menu-bar.module';
import { DialogBoxModule } from '../../shared-components/dialog-box/dialog-box.module';


@NgModule({
  declarations: [PageBuilderComponent],
  imports: [
    CommonModule,
    PageBuilderRoutingModule,
    MenuBarModule,
    DialogBoxModule
  ]
})
export class PageBuilderModule { }
