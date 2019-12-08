import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from './menu-bar.component';
import { MessageFormComponent } from './message-form/message-form.component';
import { ProductReportFormComponent } from './product-report-form/product-report-form.component';
import { ReviewComplaintFormComponent } from './review-complaint-form/review-complaint-form.component';



@NgModule({
  declarations: [MenuBarComponent, MessageFormComponent, ProductReportFormComponent, ReviewComplaintFormComponent],
  imports: [
    CommonModule
  ],
  exports: [MenuBarComponent, MessageFormComponent, ProductReportFormComponent, ReviewComplaintFormComponent]
})
export class MenuBarModule { }
