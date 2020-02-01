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
import { RowComponent } from './row/row.component';
import { ContainerComponent } from './container/container.component';
import { WidgetComponent } from './widgets/widget/widget.component';
import { ColumnComponent } from './column/column.component';
import { ProportionalWidgetComponent } from './widgets/proportional-widget/proportional-widget.component';
import { FreeformWidgetComponent } from './widgets/freeform-widget/freeform-widget.component';

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
    VideoWidgetComponent,
    RowComponent,
    ContainerComponent,
    WidgetComponent,
    ColumnComponent,
    ProportionalWidgetComponent,
    FreeformWidgetComponent
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
    VideoWidgetComponent,
    RowComponent,
    ColumnComponent
  ]
})
export class DesignerModule { }
