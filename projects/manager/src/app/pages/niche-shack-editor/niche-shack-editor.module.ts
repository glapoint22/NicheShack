import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NicheShackEditorRoutingModule } from './niche-shack-editor-routing.module';
import { NicheShackEditorComponent } from './niche-shack-editor.component';
import { MenuBarModule } from '../../shared-components/menu-bar/menu-bar.module';
import { CategoryEditorComponent } from './category-editor/category-editor.component';
import { NicheEditorComponent } from './niche-editor/niche-editor.component';
import { LeadPageEditorComponent } from './niche-editor/lead-page-editor/lead-page-editor.component';
import { ProductEditorComponent } from './product-editor/product-editor.component';
import { ProductPropertiesComponent } from './product-editor/product-properties/product-properties.component';
import { ProductContentComponent } from './product-editor/product-properties/product-content/product-content.component';
import { ProductDescriptionComponent } from './product-editor/product-properties/product-description/product-description.component';
import { ProductFiltersComponent } from './product-editor/product-properties/product-filters/product-filters.component';
import { ProductHoplinkComponent } from './product-editor/product-properties/product-hoplink/product-hoplink.component';
import { ProductKeywordsComponent } from './product-editor/product-properties/product-keywords/product-keywords.component';
import { ProductMediaComponent } from './product-editor/product-properties/product-media/product-media.component';
import { ProductEmailComponent } from './product-editor/product-email/product-email.component';
import { ColorIconComponent } from './product-editor/product-properties/product-description/color-icon/color-icon.component';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';
import { PropertiesEditorModule } from '../../properties-editor.module';
import { PricePointPopupComponent } from './product-editor/product-properties/product-content/price-point-popup/price-point-popup.component';
import { FormsModule } from '@angular/forms';
import { ContextMenuModule } from '../../shared-components/context-menu/context-menu.module';
import { DropdownMenuModule } from '../../shared-components/elements/dropdowns/dropdown-menu/dropdown-menu.module';
import { CustomInputModule } from 'shared-components/custom-input/custom-input.module';
import { DesignerModule } from '../../shared-components/designer/designer.module';


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
    ProductFiltersComponent,
    ProductHoplinkComponent,
    ProductKeywordsComponent,
    ProductMediaComponent,
    ProductEmailComponent,
    ColorIconComponent,
    PricePointPopupComponent
  ],
  imports: [
    CommonModule,
    NicheShackEditorRoutingModule,
    MenuBarModule,
    ShowHideModule,
    PropertiesEditorModule,
    FormsModule,
    ContextMenuModule,
    DropdownMenuModule,
    CustomInputModule,
    DesignerModule
  ]
})
export class NicheShackEditorModule { }
