import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HierarchyComponent } from './hierarchy.component';
import { HierarchyContentComponent } from './hierarchy-content/hierarchy-content.component';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';



@NgModule({
  declarations: [
    HierarchyComponent,
    HierarchyContentComponent
  ],
  imports: [
    CommonModule,
    ShowHideModule
  ],
  exports: [
    HierarchyComponent,
    HierarchyContentComponent
  ]
})
export class HierarchyModule { }
