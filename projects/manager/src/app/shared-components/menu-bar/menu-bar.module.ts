import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from './menu-bar.component';
import { MessageFormComponent } from './message-form/message-form.component';
import { ProductReportFormComponent } from './product-report-form/product-report-form.component';
import { ReviewComplaintFormComponent } from './review-complaint-form/review-complaint-form.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';
import { RouterModule } from '@angular/router';
import { ShackIconComponent } from '../shack-icon/shack-icon.component';
import { PopupComponent } from '../popups/popup/popup.component';

@NgModule({
  declarations: [
    MenuBarComponent,
    MessageFormComponent,
    ProductReportFormComponent,
    ReviewComplaintFormComponent,
    NotificationsComponent,
    ShackIconComponent,
    PopupComponent
  ],
  imports: [
    CommonModule,
    ShowHideModule,
    RouterModule,
  ],
  exports: [
    MenuBarComponent,
    MessageFormComponent,
    ProductReportFormComponent,
    ReviewComplaintFormComponent,
    NotificationsComponent,
    ShackIconComponent,
    PopupComponent
  ]
})
export class MenuBarModule { }