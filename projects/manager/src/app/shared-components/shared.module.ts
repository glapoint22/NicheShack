import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './elements/dropdowns/dropdown/dropdown.component';
import { ItemListComponent } from './item-lists/item-list/item-list.component';
import { CheckboxItemListComponent } from './item-lists/checkbox-item-list/checkbox-item-list.component';
import { EditableItemListComponent } from './item-lists/editable-item-list/editable-item-list.component';
import { MediaItemListComponent } from './item-lists/media-item-list/media-item-list.component';
import { NotificationsItemListComponent } from './item-lists/notifications-item-list/notifications-item-list.component';
import { CustomInputModule } from 'shared-components/custom-input/custom-input.module';
import { EditableDropdownComponent } from './elements/dropdowns/editable-dropdown/editable-dropdown.component';
import { ColorIconComponent } from '../pages/niche-shack-editor/product-editor/product-properties/product-description/color-icon/color-icon.component';
import { LinkIconComponent } from './link-icon/link-icon.component';
import { ImageComponent } from './properties/image/image.component';
import { ProductContentComponent } from '../pages/niche-shack-editor/product-editor/product-properties/product-content/product-content.component';
import { FormsModule } from '@angular/forms';
import { ProductMediaComponent } from '../pages/niche-shack-editor/product-editor/product-properties/product-media/product-media.component';
import { QueryDropdownComponent } from './elements/dropdowns/query-dropdown/query-dropdown.component';
import { CounterComponent } from './counter/counter.component';



@NgModule({
  declarations: [
    CounterComponent,
    DropdownComponent,
    EditableDropdownComponent,
    QueryDropdownComponent,
    ItemListComponent,
    CheckboxItemListComponent,
    EditableItemListComponent,
    MediaItemListComponent,
    NotificationsItemListComponent,
    ColorIconComponent,
    LinkIconComponent,
    ImageComponent,
    ProductContentComponent,
    ProductMediaComponent
  ],
  imports: [
    CommonModule,
    CustomInputModule,
    FormsModule
  ],
  exports: [
    CounterComponent,
    DropdownComponent,
    EditableDropdownComponent,
    QueryDropdownComponent,
    ItemListComponent,
    CheckboxItemListComponent,
    EditableItemListComponent,
    MediaItemListComponent,
    NotificationsItemListComponent,
    ColorIconComponent,
    LinkIconComponent,
    ImageComponent,
    ProductContentComponent,
    ProductMediaComponent
  ]
})
export class SharedModule { }
