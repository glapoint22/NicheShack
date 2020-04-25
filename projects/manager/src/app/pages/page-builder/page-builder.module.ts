import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageBuilderRoutingModule } from './page-builder-routing.module';
import { PageBuilderComponent } from './page-builder.component';
import { MenuBarModule } from '../../shared-components/menu-bar/menu-bar.module';
import { DesignerModule } from '../../shared-components/designer/designer.module';

@NgModule({
  declarations: [PageBuilderComponent],
  imports: [
    CommonModule,
    PageBuilderRoutingModule,
    MenuBarModule,
    DesignerModule
  ]
})
export class PageBuilderModule { }
