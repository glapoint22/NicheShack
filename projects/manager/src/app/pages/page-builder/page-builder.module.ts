import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageBuilderRoutingModule } from './page-builder-routing.module';
import { PageBuilderComponent } from './page-builder.component';
import { MenuBarModule } from '../../shared-components/menu-bar/menu-bar.module';
import { DesignerModule } from '../../shared-components/designer/designer.module';
import { PageEditorComponent } from './page-editor/page-editor.component';
import { PropertiesEditorModule } from '../../properties-editor.module';
import { ContextMenuModule } from '../../shared-components/context-menu/context-menu.module';
import { DropdownMenuModule } from '../../shared-components/elements/dropdowns/dropdown-menu/dropdown-menu.module';
import { PromptModule } from '../../shared-components/prompt/prompt.module';

@NgModule({
  declarations: [
    PageBuilderComponent,
    PageEditorComponent
  ],
  imports: [
    CommonModule,
    PageBuilderRoutingModule,
    MenuBarModule,
    DesignerModule,
    PropertiesEditorModule,
    ContextMenuModule,
    DropdownMenuModule,
    PromptModule
  ]
})
export class PageBuilderModule { }
