import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListsRoutingModule } from './lists-routing.module';
import { ListsComponent } from './lists.component';
import { HeaderFooterModule } from '../../shared-components/header-footer/header-footer.module';
import { DropdownButtonModule } from '../../shared-components/dropdown-button/dropdown-button.module';
import { FormsModule } from '@angular/forms';
import { CreateListModule } from '../../shared-components/create-list/create-list.module';
import { ManageCollaboratorsComponent } from './manage-collaborators/manage-collaborators.component';
import { EditListComponent } from './edit-list/edit-list.component';
import { ShareListComponent } from './share-list/share-list.component';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';
import { StarsModule } from 'shared-components/stars/stars.module';
import { PromptModule } from '../../shared-components/prompt/prompt.module';


@NgModule({
  declarations: [
    ListsComponent,
    ManageCollaboratorsComponent,
    EditListComponent,
    ShareListComponent
  ],
  imports: [
    CommonModule,
    ListsRoutingModule,
    HeaderFooterModule,
    DropdownButtonModule,
    FormsModule,
    CreateListModule,
    ShowHideModule,
    StarsModule,
    PromptModule
  ]
})
export class ListsModule { }
