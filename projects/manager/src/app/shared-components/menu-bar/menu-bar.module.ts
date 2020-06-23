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
import { CustomInputModule } from 'shared-components/custom-input/custom-input.module';
import { NicheShackHierarchyPopupComponent } from '../popups/niche-shack-hierarchy-popup/niche-shack-hierarchy-popup.component';
import { PopupComponent } from '../popups/popup/popup.component';
import { HierarchyModule } from '../hierarchy/hierarchy.module';

@NgModule({
  declarations: [
    MenuBarComponent,
    MessageFormComponent,
    ProductReportFormComponent,
    ReviewComplaintFormComponent,
    NotificationsComponent,
    ShackIconComponent,
    NicheShackHierarchyPopupComponent,
    PopupComponent
  ],
  imports: [
    CommonModule,
    ShowHideModule,
    RouterModule,
    CustomInputModule,
    HierarchyModule
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