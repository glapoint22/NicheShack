import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NicheShackEditorRoutingModule } from './niche-shack-editor-routing.module';
import { NicheShackEditorComponent } from './niche-shack-editor.component';
import { DialogBoxModule } from '../../shared-components/dialog-box/dialog-box.module';
import { MenuBarModule } from '../../shared-components/menu-bar/menu-bar.module';
import { ProductFormComponent } from './product-form/product-form.component';
import { ContentTypeFormComponent } from './content-type-form/content-type-form.component';
import { MediaBrowserModule } from '../../shared-components/media-browser/media-browser.module';
import { HierarchyContainerComponent } from './hierarchy-container/hierarchy-container.component';
import { HierarchyComponent } from './hierarchy/hierarchy.component';
import { ProductEditorComponent } from './product-editor/product-editor.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { HierarchyMenuComponent } from './hierarchy-menu/hierarchy-menu.component';
import { ColorPickerModule } from '../../shared-components/color-picker/color-picker.module';
import { VideoFormModule } from '../../shared-components/video-form/video-form.module';
import { CarouselFormModule } from '../../shared-components/carousel-form/carousel-form.module';
import { ImageFormModule } from '../../shared-components/image-form/image-form.module';


@NgModule({
  declarations: [
    NicheShackEditorComponent,
    ProductFormComponent,
    ContentTypeFormComponent,
    HierarchyContainerComponent,
    HierarchyComponent,
    ProductEditorComponent,
    ProductDescriptionComponent,
    HierarchyMenuComponent
  ],
  imports: [
    CommonModule,
    NicheShackEditorRoutingModule,
    DialogBoxModule,
    MenuBarModule,
    MediaBrowserModule,
    ColorPickerModule,
    VideoFormModule,
    CarouselFormModule,
    ImageFormModule
  ]
})
export class NicheShackEditorModule { }
