import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from './menu-bar.component';
import { MessageFormComponent } from './message-form/message-form.component';
import { ProductReportFormComponent } from './product-report-form/product-report-form.component';
import { ReviewComplaintFormComponent } from './review-complaint-form/review-complaint-form.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';
import { RouterModule } from '@angular/router';
import { HierarchyPopupComponent } from './hierarchy-popup/hierarchy-popup.component';
import { HierarchyContentComponent } from './hierarchy-popup/hierarchy-content/hierarchy-content.component';
import { PromptModule } from '../prompt/prompt.module';
import { ShackIconComponent } from '../shack-icon/shack-icon.component';



@NgModule({
  declarations: [
    MenuBarComponent,
    MessageFormComponent,
    ProductReportFormComponent,
    ReviewComplaintFormComponent,
    NotificationsComponent,
    HierarchyPopupComponent,
    HierarchyContentComponent,
    ShackIconComponent
  ],
  imports: [
    CommonModule,
    ShowHideModule,
    RouterModule,
    PromptModule
  ],
  exports: [
    MenuBarComponent,
    MessageFormComponent,
    ProductReportFormComponent,
    ReviewComplaintFormComponent,
    NotificationsComponent,
    HierarchyPopupComponent,
    HierarchyContentComponent,
    ShackIconComponent
  ]
})
export class MenuBarModule { }