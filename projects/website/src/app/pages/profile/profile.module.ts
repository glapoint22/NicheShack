import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { HeaderFooterModule } from '../../shared-components/header-footer/header-footer.module';
import { ProfileComponent } from './profile.component';
import { EditProfilePictureComponent } from './edit-profile-picture/edit-profile-picture.component';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';


@NgModule({
  declarations: [
    ProfileComponent,
    EditProfilePictureComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    HeaderFooterModule,
    ShowHideModule
  ]
})
export class ProfileModule { }
