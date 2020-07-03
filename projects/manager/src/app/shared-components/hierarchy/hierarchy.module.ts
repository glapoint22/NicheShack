import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HierarchyContentComponent } from './hierarchy-content/hierarchy-content.component';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';
import { HierarchyCheckboxContentComponent } from './hierarchy-checkbox-content/hierarchy-checkbox-content.component';
import { CustomInputModule } from 'shared-components/custom-input/custom-input.module';
import { HierarchyComponent } from './hierarchy.component';
import { EditableHierarchyComponent } from './editable-hierarchy/editable-hierarchy.component';



@NgModule({
  declarations: [
    HierarchyComponent,
    EditableHierarchyComponent,
    HierarchyContentComponent,
    HierarchyCheckboxContentComponent
  ],
  imports: [
    CommonModule,
    ShowHideModule,
    CustomInputModule
  ],
  exports: [
    HierarchyComponent,
    EditableHierarchyComponent,
    HierarchyContentComponent,
    HierarchyCheckboxContentComponent
  ]
})
export class HierarchyModule { }
