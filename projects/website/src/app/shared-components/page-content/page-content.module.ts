import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageContentComponent } from './page-content.component';
import { ContainerComponent } from './container/container.component';
import { RowComponent } from './row/row.component';
import { ColumnComponent } from './column/column.component';
import { ButtonWidgetComponent } from './button-widget/button-widget.component';
import { WidgetComponent } from './widget/widget.component';
import { TextWidgetComponent } from './text-widget/text-widget.component';
import { ImageWidgetComponent } from './image-widget/image-widget.component';
import { ContainerWidgetComponent } from './container-widget/container-widget.component';
import { LineWidgetComponent } from './line-widget/line-widget.component';
import { VideoWidgetComponent } from './video-widget/video-widget.component';
import { ProductGroupWidgetComponent } from './product-group-widget/product-group-widget.component';
import { CategoriesWidgetComponent } from './categories-widget/categories-widget.component';
import { CarouselWidgetComponent } from './carousel-widget/carousel-widget.component';



@NgModule({
  declarations: [
    PageContentComponent,
    ContainerComponent,
    RowComponent,
    ColumnComponent,
    WidgetComponent,
    ButtonWidgetComponent,
    TextWidgetComponent,
    ImageWidgetComponent,
    ContainerWidgetComponent,
    LineWidgetComponent,
    VideoWidgetComponent,
    ProductGroupWidgetComponent,
    CategoriesWidgetComponent,
    CarouselWidgetComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PageContentComponent,
    ContainerComponent,
    RowComponent,
    ColumnComponent,
    WidgetComponent,
    ButtonWidgetComponent,
    TextWidgetComponent,
    ImageWidgetComponent,
    ContainerWidgetComponent,
    LineWidgetComponent,
    VideoWidgetComponent,
    ProductGroupWidgetComponent,
    CategoriesWidgetComponent,
    CarouselWidgetComponent
  ],
  entryComponents: [
    RowComponent,
    ColumnComponent,
    ButtonWidgetComponent,
    TextWidgetComponent,
    ImageWidgetComponent,
    ContainerWidgetComponent,
    LineWidgetComponent,
    VideoWidgetComponent,
    ProductGroupWidgetComponent,
    CategoriesWidgetComponent,
    CarouselWidgetComponent
  ]
})
export class PageContentModule { }
