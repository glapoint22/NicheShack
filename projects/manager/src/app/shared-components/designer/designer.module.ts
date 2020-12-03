import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignerComponent } from './designer.component';
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
import { ProductGroupWidgetComponent } from './widgets/product-group-widget/product-group-widget.component';
import { CarouselWidgetComponent } from './widgets/carousel-widget/carousel-widget.component';
import { SharedModule } from '../shared.module';
import { GridWidgetComponent } from './widgets/grid-widget/grid-widget.component';
import { FormsModule } from '@angular/forms';
import { ProductFiltersModule } from 'shared-components/product-filters/product-filters.module';
import { ProductModule } from 'shared-components/product/product.module';
import { PaginatorModule } from 'shared-components/paginator/paginator.module';
import { ShopWidgetComponent } from './widgets/shop-widget/shop-widget.component';

@NgModule({
  declarations: [
    DesignerComponent,
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
    FreeformWidgetComponent,
    ProductGroupWidgetComponent,
    CarouselWidgetComponent,
    GridWidgetComponent,
    ShopWidgetComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ProductFiltersModule,
    ProductModule,
    PaginatorModule
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
    ColumnComponent,
    ProductGroupWidgetComponent,
    CarouselWidgetComponent,
    GridWidgetComponent,
    ShopWidgetComponent
  ]
})
export class DesignerModule { }
