import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionComponent } from '../row-properties/position/position.component';
import { VerticalAlignmentComponent } from '../row-properties/vertical-alignment/vertical-alignment.component';
import { ColumnPropertiesComponent } from '../column-properties/column-properties.component';
import { HorizontalAlignmentComponent } from '../column-properties/horizontal-alignment/horizontal-alignment.component';
import { ButtonColorComponent } from '../widget-properties/button-widget-properties/button-color/button-color.component';
import { TextComponent } from '../widget-properties/text-widget-properties/text/text.component';
import { StyleComponent } from '../widget-properties/line-widget-properties/style/style.component';
import { BannersComponent } from '../widget-properties/carousel-widget-properties/banners/banners.component';
import { ProductGroupTypeComponent } from '../widget-properties/product-group-widget-properties/product-group-type/product-group-type.component';
import { CategoriesComponent } from '../widget-properties/categories-widget-properties/categories/categories.component';
import { CustomInputModule } from 'shared-components/custom-input/custom-input.module';
import { LinkComponent } from '../properties/link/link.component';
import { BorderComponent } from '../properties/border/border.component';
import { CornersComponent } from '../properties/corners/corners.component';
import { ShadowComponent } from '../properties/shadow/shadow.component';
import { DimensionsComponent } from '../properties/dimensions/dimensions.component';
import { ColumnsComponent } from '../properties/columns/columns.component';
import { PaddingComponent } from '../properties/padding/padding.component';
import { VisibilityComponent } from '../properties/visibility/visibility.component';
import { VideoComponent } from '../widget-properties/video-widget-properties/video/video.component';
import { CaptionComponent } from '../properties/caption/caption.component';
import { NumberFieldComponent } from '../elements/number-fields/number-field/number-field.component';
import { ColorSwatchComponent } from '../elements/color-swatch/color-swatch.component';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';
import { EditableNumberFieldComponent } from '../elements/number-fields/editable-number-field/editable-number-field.component';
import { PagePropertiesComponent } from '../properties/page-properties/page-properties.component';
import { RowPropertiesComponent } from '../row-properties/row-properties.component';
import { FormsModule } from '@angular/forms';
import { WidgetPropertiesComponent } from '../widget-properties/widget-properties.component';
import { ButtonWidgetPropertiesComponent } from '../widget-properties/button-widget-properties/button-widget-properties.component';
import { ButtonWidgetNormalPropertiesComponent } from '../widget-properties/button-widget-properties/button-widget-normal-properties/button-widget-normal-properties.component';
import { ButtonWidgetHoverPropertiesComponent } from '../widget-properties/button-widget-properties/button-widget-hover-properties/button-widget-hover-properties.component';
import { ButtonWidgetActivePropertiesComponent } from '../widget-properties/button-widget-properties/button-widget-active-properties/button-widget-active-properties.component';
import { TextWidgetPropertiesComponent } from '../widget-properties/text-widget-properties/text-widget-properties.component';
import { ImageWidgetPropertiesComponent } from '../widget-properties/image-widget-properties/image-widget-properties.component';
import { VideoWidgetPropertiesComponent } from '../widget-properties/video-widget-properties/video-widget-properties.component';
import { ContainerWidgetPropertiesComponent } from '../widget-properties/container-widget-properties/container-widget-properties.component';
import { LineWidgetPropertiesComponent } from '../widget-properties/line-widget-properties/line-widget-properties.component';
import { CarouselWidgetPropertiesComponent } from '../widget-properties/carousel-widget-properties/carousel-widget-properties.component';
import { CategoriesWidgetPropertiesComponent } from '../widget-properties/categories-widget-properties/categories-widget-properties.component';
import { ProductGroupWidgetPropertiesComponent } from '../widget-properties/product-group-widget-properties/product-group-widget-properties.component';
import { BackgroundComponent } from '../properties/background/background.component';
import { ColorComponent } from '../properties/color/color.component';
import { FiltersHierarchyComponent } from '../filters-hierarchy/filters-hierarchy.component';
import { PropertiesEditorComponent } from './properties-editor.component';
import { EmailPropertiesComponent } from '../../pages/email-builder/email-editor/email-properties/email-properties.component';
import { PanelComponent } from '../panel/panel.component';
import { HierarchyCheckboxContentComponent } from '../hierarchy/hierarchy-checkbox-content/hierarchy-checkbox-content.component';
import { SharedModule } from '../shared.module';


@NgModule({
  declarations: [
    PropertiesEditorComponent,
    RowPropertiesComponent,
    PositionComponent,
    VerticalAlignmentComponent,
    ColumnPropertiesComponent,
    HorizontalAlignmentComponent,
    WidgetPropertiesComponent,
    ButtonColorComponent,
    TextComponent,
    StyleComponent,
    BannersComponent,
    ProductGroupWidgetPropertiesComponent,
    ProductGroupTypeComponent,
    CategoriesComponent,
    PanelComponent,
    LinkComponent,
    BorderComponent,
    CornersComponent,
    ShadowComponent,
    DimensionsComponent,
    ColumnsComponent,
    PaddingComponent,
    VisibilityComponent,
    VideoComponent,
    CaptionComponent,
    NumberFieldComponent,
    ColorSwatchComponent,
    EditableNumberFieldComponent,
    PagePropertiesComponent,
    ButtonWidgetPropertiesComponent,
    ButtonWidgetNormalPropertiesComponent,
    ButtonWidgetHoverPropertiesComponent,
    ButtonWidgetActivePropertiesComponent,
    TextWidgetPropertiesComponent,
    ImageWidgetPropertiesComponent,
    VideoWidgetPropertiesComponent,
    ContainerWidgetPropertiesComponent,
    LineWidgetPropertiesComponent,
    CarouselWidgetPropertiesComponent,
    CategoriesWidgetPropertiesComponent,
    BackgroundComponent,
    ColorComponent,
    FiltersHierarchyComponent,
    EmailPropertiesComponent,
    HierarchyCheckboxContentComponent
  ],
  imports: [
    CommonModule,
    CustomInputModule,
    ShowHideModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    PropertiesEditorComponent,
    RowPropertiesComponent,
    PositionComponent,
    VerticalAlignmentComponent,
    ColumnPropertiesComponent,
    HorizontalAlignmentComponent,
    WidgetPropertiesComponent,
    ButtonColorComponent,
    TextComponent,
    StyleComponent,
    BannersComponent,
    ProductGroupWidgetPropertiesComponent,
    ProductGroupTypeComponent,
    CategoriesComponent,
    PanelComponent,
    LinkComponent,
    BorderComponent,
    CornersComponent,
    ShadowComponent,
    DimensionsComponent,
    ColumnsComponent,
    PaddingComponent,
    VisibilityComponent,
    VideoComponent,
    CaptionComponent,
    NumberFieldComponent,
    ColorSwatchComponent,
    EditableNumberFieldComponent,
    PagePropertiesComponent,
    ButtonWidgetPropertiesComponent,
    ButtonWidgetNormalPropertiesComponent,
    ButtonWidgetHoverPropertiesComponent,
    ButtonWidgetActivePropertiesComponent,
    TextWidgetPropertiesComponent,
    ImageWidgetPropertiesComponent,
    VideoWidgetPropertiesComponent,
    ContainerWidgetPropertiesComponent,
    LineWidgetPropertiesComponent,
    CarouselWidgetPropertiesComponent,
    CategoriesWidgetPropertiesComponent,
    BackgroundComponent,
    ColorComponent,
    FiltersHierarchyComponent,
    EmailPropertiesComponent,
    HierarchyCheckboxContentComponent
  ]
})
export class PropertiesEditorModule { }
