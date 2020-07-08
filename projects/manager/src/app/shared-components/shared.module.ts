import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import { DropdownComponent } from './elements/dropdowns/dropdown/dropdown.component';
import { ItemListComponent } from './item-lists/item-list/item-list.component';
import { CheckboxItemListComponent } from './item-lists/checkbox-item-list/checkbox-item-list.component';
import { EditableItemListComponent } from './item-lists/editable-item-list/editable-item-list.component';
import { MediaItemListComponent } from './item-lists/media-item-list/media-item-list.component';
import { NotificationsItemListComponent } from './item-lists/notifications-item-list/notifications-item-list.component';
import { CustomInputModule } from 'shared-components/custom-input/custom-input.module';



@NgModule({
  declarations: [
    PaginatorComponent,
    DropdownComponent,
    ItemListComponent,
    CheckboxItemListComponent,
    EditableItemListComponent,
    MediaItemListComponent,
    NotificationsItemListComponent
  ],
  imports: [
    CommonModule,
    CustomInputModule
  ],
  exports: [
    PaginatorComponent,
    DropdownComponent,
    ItemListComponent,
    CheckboxItemListComponent,
    EditableItemListComponent,
    MediaItemListComponent,
    NotificationsItemListComponent
  ]
})
export class SharedModule { }
