import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';
import { HierarchyContentComponent } from './hierarchy-content/hierarchy-content.component';
import { HierarchyPopupComponent } from './hierarchy-popup.component';



@NgModule({
  declarations: [
    HierarchyPopupComponent,
    HierarchyContentComponent
  ],
  imports: [
    CommonModule,
    ShowHideModule
  ],
  exports: [
    HierarchyPopupComponent,
    HierarchyContentComponent
  ]
})
export class HierarchyPopupModule { }
