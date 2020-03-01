import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NicheShackEditorRoutingModule } from './niche-shack-editor-routing.module';
import { NicheShackEditorComponent } from './niche-shack-editor.component';
import { DialogBoxModule } from '../../shared-components/dialog-box/dialog-box.module';
import { MenuBarModule } from '../../shared-components/menu-bar/menu-bar.module';
import { ProductFormComponent } from './product-form/product-form.component';
import { MediaFormComponent } from './product-editor/media-form/media-form.component';
import { MediaBrowserModule } from '../../shared-components/media-browser/media-browser.module';
import { HierarchyComponent } from './hierarchy/hierarchy.component';
import { ProductEditorComponent } from './product-editor/product-editor.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { HierarchyMenuComponent } from './hierarchy-menu/hierarchy-menu.component';
import { ColorPickerModule } from '../../shared-components/color-picker/color-picker.module';
import { VideoFormModule } from '../../shared-components/video-form/video-form.module';
import { CarouselFormModule } from '../../shared-components/carousel-form/carousel-form.module';
import { ImageFormModule } from '../../shared-components/image-form/image-form.module';
import { LineFormModule } from '../../shared-components/line-form/line-form.module';
import { FeaturedProductsFormModule } from '../../shared-components/featured-products-form/featured-products-form.module';
import { CategoriesFormModule } from '../../shared-components/categories-form/categories-form.module';
import { NicheFormComponent } from './niche-form/niche-form.component';
import { DesignerModule } from '../../shared-components/designer/designer.module';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';
import { PromptModule } from '../../shared-components/prompt/prompt.module';
import { HierarchyContentComponent } from './hierarchy-content/hierarchy-content.component';
import { PricePointFormComponent } from './product-editor/price-point-form/price-point-form.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NicheShackEditorComponent,
    ProductFormComponent,
    MediaFormComponent,
    PricePointFormComponent,
    HierarchyComponent,
    ProductEditorComponent,
    ProductDescriptionComponent,
    HierarchyMenuComponent,
    NicheFormComponent,
    HierarchyContentComponent
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
    ImageFormModule,
    LineFormModule,
    FeaturedProductsFormModule,
    CategoriesFormModule,
    DesignerModule,
    ShowHideModule,
    PromptModule,
    FormsModule
  ]
})
export class NicheShackEditorModule { }
