import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from './menu-bar.component';
import { MessageFormComponent } from './message-form/message-form.component';
import { ProductReportFormComponent } from './product-report-form/product-report-form.component';
import { ReviewComplaintFormComponent } from './review-complaint-form/review-complaint-form.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MenuBarComponent,
    MessageFormComponent,
    ProductReportFormComponent,
    ReviewComplaintFormComponent,
    NotificationsComponent,
    NavigationMenuComponent
  ],
  imports: [
    CommonModule,
    ShowHideModule,
    RouterModule
  ],
  exports: [
    MenuBarComponent,
    MessageFormComponent,
    ProductReportFormComponent,
    ReviewComplaintFormComponent,
    NotificationsComponent,
    NavigationMenuComponent
  ]
})
export class MenuBarModule { }