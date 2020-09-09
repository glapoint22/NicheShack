import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageContentComponent } from './page-content.component';
import { ContainerComponent } from './container/container.component';
import { RowComponent } from './row/row.component';
import { ColumnComponent } from './column/column.component';



@NgModule({
  declarations: [
    PageContentComponent,
    ContainerComponent,
    RowComponent,
    ColumnComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PageContentComponent,
    ContainerComponent,
    RowComponent,
    ColumnComponent
  ],
  entryComponents: [
    RowComponent,
    ColumnComponent
  ]
})
export class PageContentModule { }
