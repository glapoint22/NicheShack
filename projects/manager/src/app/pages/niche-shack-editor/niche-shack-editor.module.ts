import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NicheShackEditorRoutingModule } from './niche-shack-editor-routing.module';
import { NicheShackEditorComponent } from './niche-shack-editor.component';
import { DialogBoxModule } from '../../shared-components/dialog-box/dialog-box.module';
import { MenuBarModule } from '../../shared-components/menu-bar/menu-bar.module';
import { ProductFormComponent } from './product-form/product-form.component';
import { ContentTypeFormComponent } from './content-type-form/content-type-form.component';
import { MediaBrowserModule } from '../../shared-components/media-browser/media-browser.module';


@NgModule({
  declarations: [
    NicheShackEditorComponent,
    ProductFormComponent,
    ContentTypeFormComponent
  ],
  imports: [
    CommonModule,
    NicheShackEditorRoutingModule,
    DialogBoxModule,
    MenuBarModule,
    MediaBrowserModule
  ]
})
export class NicheShackEditorModule { }
