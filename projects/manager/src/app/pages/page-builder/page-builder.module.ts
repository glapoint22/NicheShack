import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageBuilderRoutingModule } from './page-builder-routing.module';
import { PageBuilderComponent } from './page-builder.component';
import { MenuBarModule } from '../../shared-components/menu-bar/menu-bar.module';
import { DialogBoxModule } from '../../shared-components/dialog-box/dialog-box.module';
import { LinkFormModule } from '../../shared-components/link-form/link-form.module';
import { ButtonFormModule } from '../../shared-components/button-form/button-form.module';
import { VideoFormModule } from '../../shared-components/video-form/video-form.module';


@NgModule({
  declarations: [PageBuilderComponent],
  imports: [
    CommonModule,
    PageBuilderRoutingModule,
    MenuBarModule,
    DialogBoxModule,
    LinkFormModule,
    ButtonFormModule,
    VideoFormModule
  ]
})
export class PageBuilderModule { }
