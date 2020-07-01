import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailBuilderRoutingModule } from './email-builder-routing.module';
import { EmailBuilderComponent } from './email-builder.component';
import { DesignerModule } from '../../shared-components/designer/designer.module';
import { PropertiesEditorModule } from '../../shared-components/properties-editor/properties-editor.module';
import { PromptModule } from '../../shared-components/prompt/prompt.module';
import { EmailEditorComponent } from './email-editor/email-editor.component';


@NgModule({
  declarations: [
    EmailBuilderComponent,
    EmailEditorComponent
  ],
  imports: [
    CommonModule,
    EmailBuilderRoutingModule,
    DesignerModule,
    PropertiesEditorModule,
    PromptModule
  ]
})
export class EmailBuilderModule { }
