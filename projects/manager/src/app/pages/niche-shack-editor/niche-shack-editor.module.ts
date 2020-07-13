import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NicheShackEditorRoutingModule } from './niche-shack-editor-routing.module';
import { NicheShackEditorComponent } from './niche-shack-editor.component';
import { CategoryEditorComponent } from './category-editor/category-editor.component';
import { NicheEditorComponent } from './niche-editor/niche-editor.component';
import { LeadPageEditorComponent } from './niche-editor/lead-page-editor/lead-page-editor.component';
import { ProductEditorComponent } from './product-editor/product-editor.component';
import { ProductPropertiesComponent } from './product-editor/product-properties/product-properties.component';
import { ProductContentComponent } from './product-editor/product-properties/product-content/product-content.component';
import { ProductDescriptionComponent } from './product-editor/product-properties/product-description/product-description.component';
import { ProductHoplinkComponent } from './product-editor/product-properties/product-hoplink/product-hoplink.component';
import { ProductKeywordsComponent } from './product-editor/product-properties/product-keywords/product-keywords.component';
import { ProductMediaComponent } from './product-editor/product-properties/product-media/product-media.component';
import { ProductEmailComponent } from './product-editor/product-email/product-email.component';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';
import { PropertiesEditorModule } from '../../shared-components/properties-editor/properties-editor.module';
import { FormsModule } from '@angular/forms';
import { CustomInputModule } from 'shared-components/custom-input/custom-input.module';
import { DesignerModule } from '../../shared-components/designer/designer.module';
import { PromptModule } from '../../shared-components/prompt/prompt.module';
import { ProductVendorComponent } from './product-editor/product-properties/product-vendor/product-vendor.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { StarsModule } from 'shared-components/stars/stars.module';
import { SharedModule } from '../../shared-components/shared.module';
import { ProductImageComponent } from './product-editor/product-properties/product-image/product-image.component';


@NgModule({
  declarations: [
    NicheShackEditorComponent,
    CategoryEditorComponent,
    NicheEditorComponent,
    LeadPageEditorComponent,
    ProductEditorComponent,
    ProductPropertiesComponent,
    ProductContentComponent,
    ProductDescriptionComponent,
    ProductHoplinkComponent,
    ProductKeywordsComponent,
    ProductMediaComponent,
    ProductEmailComponent,
    ProductVendorComponent,
    ProductInfoComponent,
    ProductImageComponent
  ],
  imports: [
    CommonModule,
    NicheShackEditorRoutingModule,
    ShowHideModule,
    PropertiesEditorModule,
    FormsModule,
    CustomInputModule,
    DesignerModule,
    PromptModule,
    StarsModule,
    SharedModule
  ]
})
export class NicheShackEditorModule { }
