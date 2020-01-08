import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageBuilderRoutingModule } from './page-builder-routing.module';
import { PageBuilderComponent } from './page-builder.component';
import { MenuBarModule } from '../../shared-components/menu-bar/menu-bar.module';
import { DialogBoxModule } from '../../shared-components/dialog-box/dialog-box.module';
import { LinkFormModule } from '../../shared-components/link-form/link-form.module';
import { ButtonFormModule } from '../../shared-components/button-form/button-form.module';
import { VideoFormModule } from '../../shared-components/video-form/video-form.module';
import { TextFormModule } from '../../shared-components/text-form/text-form.module';
import { ContainerFormModule } from '../../shared-components/container-form/container-form.module';
import { WidgetsModule } from '../../shared-components/widgets/widgets.module';
import { RowFormModule } from '../../shared-components/row-form/row-form.module';
import { DesignerModule } from '../../shared-components/designer/designer.module';
import { ColorPickerModule } from '../../shared-components/color-picker/color-picker.module';


@NgModule({
  declarations: [PageBuilderComponent],
  imports: [
    CommonModule,
    PageBuilderRoutingModule,
    MenuBarModule,
    DialogBoxModule,
    LinkFormModule,
    ButtonFormModule,
    VideoFormModule,
    TextFormModule,
    ContainerFormModule,
    WidgetsModule,
    RowFormModule,
    DesignerModule,
    ColorPickerModule
  ]
})
export class PageBuilderModule { }
