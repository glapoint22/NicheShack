import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickLookComponent } from './quick-look.component';
import { ShowHideModule } from '../../directives/show-hide/show-hide.module';
import { ProductInfoModule } from '../product-info/product-info.module';

@NgModule({
  declarations: [QuickLookComponent],
  imports: [
    CommonModule,
    ShowHideModule,
    ProductInfoModule
  ],
  exports: [QuickLookComponent]
})
export class QuickLookModule { }
