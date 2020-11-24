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
import { RouterModule } from '@angular/router';
import { CarouselModule } from '../../directives/carousel.module';
import { GridWidgetComponent } from './grid-widget/grid-widget.component';
import { ProductFiltersModule } from 'shared-components/product-filters/product-filters.module';
import { CustomInputModule } from 'shared-components/custom-input/custom-input.module';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';
import { FormsModule } from '@angular/forms';
import { ProductModule } from 'shared-components/product/product.module';
import { PaginatorModule } from 'shared-components/paginator/paginator.module';



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
    CarouselWidgetComponent,
    GridWidgetComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CarouselModule,
    ProductFiltersModule,
    CustomInputModule,
    ShowHideModule,
    FormsModule,
    ProductModule,
    PaginatorModule
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
    CarouselWidgetComponent,
    GridWidgetComponent
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
    CarouselWidgetComponent,
    GridWidgetComponent
  ]
})
export class PageContentModule { }
