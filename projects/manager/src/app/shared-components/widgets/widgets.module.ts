import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonWidgetComponent } from './button-widget/button-widget.component';
import { TextWidgetComponent } from './text-widget/text-widget.component';
import { ImageWidgetComponent } from './image-widget/image-widget.component';
import { VideoWidgetComponent } from './video-widget/video-widget.component';
import { ContainerWidgetComponent } from './container-widget/container-widget.component';
import { LineWidgetComponent } from './line-widget/line-widget.component';



@NgModule({
  declarations: [
    ButtonWidgetComponent,
    TextWidgetComponent,
    ImageWidgetComponent,
    VideoWidgetComponent,
    ContainerWidgetComponent,
    LineWidgetComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonWidgetComponent,
    TextWidgetComponent,
    ImageWidgetComponent,
    VideoWidgetComponent,
    ContainerWidgetComponent,
    LineWidgetComponent
  ]
})
export class WidgetsModule { }
