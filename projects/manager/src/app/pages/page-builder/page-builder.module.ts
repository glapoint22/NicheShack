import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageBuilderRoutingModule } from './page-builder-routing.module';
import { PageBuilderComponent } from './page-builder.component';
import { DesignerModule } from '../../shared-components/designer/designer.module';
import { PageEditorComponent } from './page-editor/page-editor.component';
import { PropertiesEditorModule } from '../../shared-components/properties-editor/properties-editor.module';
import { PromptModule } from '../../shared-components/prompt/prompt.module';

@NgModule({
  declarations: [
    PageBuilderComponent,
    PageEditorComponent
  ],
  imports: [
    CommonModule,
    PageBuilderRoutingModule,
    DesignerModule,
    PropertiesEditorModule,
    PromptModule
  ]
})
export class PageBuilderModule { }
