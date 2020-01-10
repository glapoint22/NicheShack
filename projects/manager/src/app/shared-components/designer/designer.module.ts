import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignerComponent } from './designer.component';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';
import { ProductGroupMenuComponent } from './product-group-menu/product-group-menu.component';
import { PagesMenuComponent } from './pages-menu/pages-menu.component';
import { ButtonWidgetComponent } from './widgets/button-widget/button-widget.component';
import { ContainerWidgetComponent } from './widgets/container-widget/container-widget.component';
import { ImageWidgetComponent } from './widgets/image-widget/image-widget.component';
import { LineWidgetComponent } from './widgets/line-widget/line-widget.component';
import { TextWidgetComponent } from './widgets/text-widget/text-widget.component';
import { VideoWidgetComponent } from './widgets/video-widget/video-widget.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DesignerComponent,
    ProductGroupMenuComponent,
    PagesMenuComponent,
    ButtonWidgetComponent,
    ContainerWidgetComponent,
    ImageWidgetComponent,
    LineWidgetComponent,
    TextWidgetComponent,
    VideoWidgetComponent
  ],
  imports: [
    CommonModule,
    ShowHideModule
  ],
  exports: [DesignerComponent],
  entryComponents: [
    ButtonWidgetComponent,
    ContainerWidgetComponent,
    ImageWidgetComponent,
    LineWidgetComponent,
    TextWidgetComponent,
    VideoWidgetComponent
  ]
})
export class DesignerModule { }
