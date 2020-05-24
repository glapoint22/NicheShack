import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionComponent } from './shared-components/row-properties/position/position.component';
import { VerticalAlignmentComponent } from './shared-components/row-properties/vertical-alignment/vertical-alignment.component';
import { ColumnPropertiesComponent } from './shared-components/column-properties/column-properties.component';
import { HorizontalAlignmentComponent } from './shared-components/column-properties/horizontal-alignment/horizontal-alignment.component';
import { ButtonColorComponent } from './shared-components/widget-properties/button-widget-properties/button-color/button-color.component';
import { TextComponent } from './shared-components/widget-properties/text-widget-properties/text/text.component';
import { StyleComponent } from './shared-components/widget-properties/line-widget-properties/style/style.component';
import { BannersComponent } from './shared-components/widget-properties/carousel-widget-properties/banners/banners.component';
import { ProductGroupTypeComponent } from './shared-components/widget-properties/product-group-widget-properties/product-group-type/product-group-type.component';
import { CategoriesComponent } from './shared-components/widget-properties/categories-widget-properties/categories/categories.component';
import { EnableablePanelComponent } from './shared-components/panels/enableable-panel/enableable-panel.component';
import { PanelComponent } from './shared-components/panels/panel/panel.component';
import { CustomInputModule } from 'shared-components/custom-input/custom-input.module';
import { LinkComponent } from './shared-components/properties/link/link.component';
import { FillComponent } from './shared-components/properties/fill/fill.component';
import { BorderComponent } from './shared-components/properties/border/border.component';
import { CornersComponent } from './shared-components/properties/corners/corners.component';
import { ShadowComponent } from './shared-components/properties/shadow/shadow.component';
import { DimensionsComponent } from './shared-components/properties/dimensions/dimensions.component';
import { ColumnsComponent } from './shared-components/properties/columns/columns.component';
import { PaddingComponent } from './shared-components/properties/padding/padding.component';
import { VisibilityComponent } from './shared-components/properties/visibility/visibility.component';
import { ImageComponent } from './shared-components/properties/image/image.component';
import { VideoComponent } from './shared-components/widget-properties/video-widget-properties/video/video.component';
import { CaptionComponent } from './shared-components/properties/caption/caption.component';
import { NumberFieldComponent } from './shared-components/elements/number-fields/number-field/number-field.component';
import { DropdownComponent } from './shared-components/elements/dropdowns/dropdown/dropdown.component';
import { ColorSwatchComponent } from './shared-components/elements/color-swatch/color-swatch.component';
import { ColorPickerPopupComponent } from './shared-components/popups/color-picker-popup/color-picker-popup.component';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';
import { LinkPopupComponent } from './shared-components/popups/link-popup/link-popup.component';
import { MediaBrowserPopupComponent } from './shared-components/popups/media-browser-popup/media-browser-popup.component';
import { EditableDropdownComponent } from './shared-components/elements/dropdowns/editable-dropdown/editable-dropdown.component';
import { PaginatorComponent } from './shared-components/paginator/paginator.component';
import { ItemListComponent } from './shared-components/item-lists/item-list/item-list.component';
import { EditableItemListComponent } from './shared-components/item-lists/editable-item-list/editable-item-list.component';
import { CheckboxItemListComponent } from './shared-components/item-lists/checkbox-item-list/checkbox-item-list.component';
import { EditableNumberFieldComponent } from './shared-components/elements/number-fields/editable-number-field/editable-number-field.component';
import { PagePropertiesComponent } from './shared-components/properties/page-properties/page-properties.component';
import { RowPropertiesComponent } from './shared-components/row-properties/row-properties.component';
import { FormsModule } from '@angular/forms';
import { WidgetPropertiesComponent } from './shared-components/widget-properties/widget-properties.component';
import { ButtonTextComponent } from './shared-components/widget-properties/button-widget-properties/button-widget-normal-properties/button-text/button-text.component';
import { ButtonWidgetPropertiesComponent } from './shared-components/widget-properties/button-widget-properties/button-widget-properties.component';
import { ButtonWidgetNormalPropertiesComponent } from './shared-components/widget-properties/button-widget-properties/button-widget-normal-properties/button-widget-normal-properties.component';
import { ButtonWidgetHoverPropertiesComponent } from './shared-components/widget-properties/button-widget-properties/button-widget-hover-properties/button-widget-hover-properties.component';
import { ButtonWidgetActivePropertiesComponent } from './shared-components/widget-properties/button-widget-properties/button-widget-active-properties/button-widget-active-properties.component';
import { TextWidgetPropertiesComponent } from './shared-components/widget-properties/text-widget-properties/text-widget-properties.component';
import { ImageWidgetPropertiesComponent } from './shared-components/widget-properties/image-widget-properties/image-widget-properties.component';
import { VideoWidgetPropertiesComponent } from './shared-components/widget-properties/video-widget-properties/video-widget-properties.component';
import { ContainerWidgetPropertiesComponent } from './shared-components/widget-properties/container-widget-properties/container-widget-properties.component';
import { LineWidgetPropertiesComponent } from './shared-components/widget-properties/line-widget-properties/line-widget-properties.component';
import { CarouselWidgetPropertiesComponent } from './shared-components/widget-properties/carousel-widget-properties/carousel-widget-properties.component';
import { CategoriesWidgetPropertiesComponent } from './shared-components/widget-properties/categories-widget-properties/categories-widget-properties.component';
import { ProductGroupWidgetPropertiesComponent } from './shared-components/widget-properties/product-group-widget-properties/product-group-widget-properties.component';
import { NormalizedNumberFieldComponent } from './shared-components/elements/number-fields/normalized-number-field/normalized-number-field.component';
import { CoverComponent } from './shared-components/cover/cover.component';
import { PopupComponent } from './shared-components/popups/popup/popup.component';
import { BackgroundComponent } from './shared-components/properties/background/background.component';
import { ShowPopupDirective } from './directives/show-popup/show-popup.directive';
import { MediaItemListComponent } from './shared-components/item-lists/media-item-list/media-item-list.component';
import { LinkIconComponent } from './shared-components/link-icon/link-icon.component';


@NgModule({
  declarations: [
    RowPropertiesComponent,
    PositionComponent,
    VerticalAlignmentComponent,
    ColumnPropertiesComponent,
    HorizontalAlignmentComponent,
    WidgetPropertiesComponent,
    ButtonColorComponent,
    ButtonTextComponent,
    TextComponent,
    StyleComponent,
    BannersComponent,
    ProductGroupWidgetPropertiesComponent,
    ProductGroupTypeComponent,
    CategoriesComponent,
    EnableablePanelComponent,
    PanelComponent,
    LinkComponent,
    FillComponent,
    BorderComponent,
    CornersComponent,
    ShadowComponent,
    DimensionsComponent,
    ColumnsComponent,
    PaddingComponent,
    VisibilityComponent,
    ImageComponent,
    VideoComponent,
    CaptionComponent,
    NumberFieldComponent,
    DropdownComponent,
    EditableDropdownComponent,
    ColorSwatchComponent,
    ColorPickerPopupComponent,
    LinkPopupComponent,
    MediaBrowserPopupComponent,
    PaginatorComponent,
    ItemListComponent,
    EditableItemListComponent,
    CheckboxItemListComponent,
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
    NormalizedNumberFieldComponent,
    CoverComponent,
    PopupComponent,
    BackgroundComponent,
    LinkIconComponent,
    ShowPopupDirective,
    MediaItemListComponent
  ],
  imports: [
    CommonModule,
    CustomInputModule,
    ShowHideModule,
    FormsModule
  ],
  exports: [
    RowPropertiesComponent,
    PositionComponent,
    VerticalAlignmentComponent,
    ColumnPropertiesComponent,
    HorizontalAlignmentComponent,
    WidgetPropertiesComponent,
    ButtonColorComponent,
    ButtonTextComponent,
    TextComponent,
    StyleComponent,
    BannersComponent,
    ProductGroupWidgetPropertiesComponent,
    ProductGroupTypeComponent,
    CategoriesComponent,
    EnableablePanelComponent,
    PanelComponent,
    LinkComponent,
    FillComponent,
    BorderComponent,
    CornersComponent,
    ShadowComponent,
    DimensionsComponent,
    ColumnsComponent,
    PaddingComponent,
    VisibilityComponent,
    ImageComponent,
    VideoComponent,
    CaptionComponent,
    NumberFieldComponent,
    DropdownComponent,
    EditableDropdownComponent,
    ColorSwatchComponent,
    ColorPickerPopupComponent,
    LinkPopupComponent,
    MediaBrowserPopupComponent,
    PaginatorComponent,
    ItemListComponent,
    EditableItemListComponent,
    CheckboxItemListComponent,
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
    NormalizedNumberFieldComponent,
    CoverComponent,
    PopupComponent,
    BackgroundComponent,
    LinkIconComponent,
    ShowPopupDirective,
    MediaItemListComponent
  ]
})
export class PropertiesEditorModule { }
