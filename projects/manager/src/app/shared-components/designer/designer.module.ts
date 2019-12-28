import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignerComponent } from './designer.component';
import { WidgetsModule } from '../widgets/widgets.module';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';
import { ProductGroupMenuComponent } from './product-group-menu/product-group-menu.component';




@NgModule({
  declarations: [DesignerComponent, ProductGroupMenuComponent],
  imports: [
    CommonModule,
    WidgetsModule,
    ShowHideModule
  ],
  exports: [DesignerComponent]
})
export class DesignerModule { }
