import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductInfoComponent } from './product-info.component';
import { StarsModule } from '../stars/stars.module';
import { ReportItemComponent } from './report-item/report-item.component';
import { FormsModule } from '@angular/forms';
import { AddToListComponent } from './add-to-list/add-to-list.component';
import { CreateListModule } from '../create-list/create-list.module';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';



@NgModule({
  declarations: [
    ProductInfoComponent,
    ReportItemComponent,
    AddToListComponent
  ],
  imports: [
    CommonModule,
    StarsModule,
    ShowHideModule,
    FormsModule,
    CreateListModule
  ],
  exports: [
    ProductInfoComponent,
    ReportItemComponent,
    AddToListComponent
  ]
})
export class ProductInfoModule { }
