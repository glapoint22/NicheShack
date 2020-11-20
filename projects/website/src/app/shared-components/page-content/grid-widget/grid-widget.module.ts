import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridWidgetComponent } from './grid-widget.component';
import { ProductModule } from '../../product/product.module';



@NgModule({
  declarations: [
    GridWidgetComponent
  ],
  imports: [
    CommonModule,
    ProductModule
  ],
  exports: [
    GridWidgetComponent
  ],
  entryComponents: [
    GridWidgetComponent
  ]
})
export class GridWidgetModule { }
