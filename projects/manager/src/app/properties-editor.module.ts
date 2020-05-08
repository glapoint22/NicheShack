import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowEditorComponent } from './shared-components/row-editor/row-editor.component';
import { PositionComponent } from './shared-components/row-editor/position/position.component';
import { VerticalAlignmentComponent } from './shared-components/row-editor/vertical-alignment/vertical-alignment.component';
import { ColumnEditorComponent } from './shared-components/column-editor/column-editor.component';
import { HorizontalAlignmentComponent } from './shared-components/column-editor/horizontal-alignment/horizontal-alignment.component';
import { WidgetEditorComponent } from './shared-components/widget-editor/widget-editor.component';
import { ButtonWidgetEditorComponent } from './shared-components/widget-editor/button-widget-editor/button-widget-editor.component';
import { ButtonColorComponent } from './shared-components/widget-editor/button-widget-editor/button-color/button-color.component';
import { ButtonWidgetNormalEditorComponent } from './shared-components/widget-editor/button-widget-editor/button-widget-normal-editor/button-widget-normal-editor.component';
import { ButtonTextComponent } from './shared-components/widget-editor/button-widget-editor/button-widget-normal-editor/button-text/button-text.component';
import { ButtonWidgetHoverEditorComponent } from './shared-components/widget-editor/button-widget-editor/button-widget-hover-editor/button-widget-hover-editor.component';
import { ButtonWidgetActiveEditorComponent } from './shared-components/widget-editor/button-widget-editor/button-widget-active-editor/button-widget-active-editor.component';
import { TextWidgetEditorComponent } from './shared-components/widget-editor/text-widget-editor/text-widget-editor.component';
import { TextComponent } from './shared-components/widget-editor/text-widget-editor/text/text.component';
import { ImageWidgetEditorComponent } from './shared-components/widget-editor/image-widget-editor/image-widget-editor.component';
import { VideoWidgetEditorComponent } from './shared-components/widget-editor/video-widget-editor/video-widget-editor.component';
import { ContainerWidgetEditorComponent } from './shared-components/widget-editor/container-widget-editor/container-widget-editor.component';
import { LineWidgetEditorComponent } from './shared-components/widget-editor/line-widget-editor/line-widget-editor.component';
import { StyleComponent } from './shared-components/widget-editor/line-widget-editor/style/style.component';
import { CarouselWidgetEditorComponent } from './shared-components/widget-editor/carousel-widget-editor/carousel-widget-editor.component';
import { BannersComponent } from './shared-components/widget-editor/carousel-widget-editor/banners/banners.component';
import { ProductGroupWidgetEditorComponent } from './shared-components/widget-editor/product-group-widget-editor/product-group-widget-editor.component';
import { ProductGroupTypeComponent } from './shared-components/widget-editor/product-group-widget-editor/product-group-type/product-group-type.component';
import { CategoriesWidgetEditorComponent } from './shared-components/widget-editor/categories-widget-editor/categories-widget-editor.component';
import { CategoriesComponent } from './shared-components/widget-editor/categories-widget-editor/categories/categories.component';
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
import { VideoComponent } from './shared-components/properties/video/video.component';
import { CaptionComponent } from './shared-components/properties/caption/caption.component';
import { EmailComponent } from './shared-components/properties/email/email.component';
import { NumberFieldComponent } from './shared-components/elements/number-field/number-field.component';
import { DropdownComponent } from './shared-components/elements/dropdowns/dropdown/dropdown.component';
import { ColorSwatchComponent } from './shared-components/elements/color-swatch/color-swatch.component';
import { ColorPickerPopupComponent } from './shared-components/popups/color-picker-popup/color-picker-popup.component';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';
import { LinkPopupComponent } from './shared-components/popups/link-popup/link-popup.component';
import { MediaBrowserPopupComponent } from './shared-components/popups/media-browser-popup/media-browser-popup.component';
import { EditableDropdownComponent } from './shared-components/elements/dropdowns/editable-dropdown/editable-dropdown.component';
import { ImagePropertyComponent } from './shared-components/image-property/image-property.component';
import { PaginatorComponent } from './shared-components/paginator/paginator.component';
import { ItemListComponent } from './shared-components/item-lists/item-list/item-list.component';
import { EditableItemListComponent } from './shared-components/item-lists/editable-item-list/editable-item-list.component';
import { CheckboxItemListComponent } from './shared-components/item-lists/checkbox-item-list/checkbox-item-list.component';


@NgModule({
  declarations: [
    RowEditorComponent,
    PositionComponent,
    VerticalAlignmentComponent,
    ColumnEditorComponent,
    HorizontalAlignmentComponent,
    WidgetEditorComponent,
    ButtonWidgetEditorComponent,
    ButtonColorComponent,
    ButtonWidgetNormalEditorComponent,
    ButtonTextComponent,
    ButtonWidgetHoverEditorComponent,
    ButtonWidgetActiveEditorComponent,
    TextWidgetEditorComponent,
    TextComponent,
    ImageWidgetEditorComponent,
    VideoWidgetEditorComponent,
    ContainerWidgetEditorComponent,
    LineWidgetEditorComponent,
    StyleComponent,
    CarouselWidgetEditorComponent,
    BannersComponent,
    ProductGroupWidgetEditorComponent,
    ProductGroupTypeComponent,
    CategoriesWidgetEditorComponent,
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
    EmailComponent,
    NumberFieldComponent,
    DropdownComponent,
    EditableDropdownComponent,
    ColorSwatchComponent,
    ColorPickerPopupComponent,
    LinkPopupComponent,
    MediaBrowserPopupComponent,
    ImagePropertyComponent,
    PaginatorComponent,
    ItemListComponent,
    EditableItemListComponent,
    CheckboxItemListComponent
  ],
  imports: [
    CommonModule,
    CustomInputModule,
    ShowHideModule
  ],
  exports: [
    RowEditorComponent,
    PositionComponent,
    VerticalAlignmentComponent,
    ColumnEditorComponent,
    HorizontalAlignmentComponent,
    WidgetEditorComponent,
    ButtonWidgetEditorComponent,
    ButtonColorComponent,
    ButtonWidgetNormalEditorComponent,
    ButtonTextComponent,
    ButtonWidgetHoverEditorComponent,
    ButtonWidgetActiveEditorComponent,
    TextWidgetEditorComponent,
    TextComponent,
    ImageWidgetEditorComponent,
    VideoWidgetEditorComponent,
    ContainerWidgetEditorComponent,
    LineWidgetEditorComponent,
    StyleComponent,
    CarouselWidgetEditorComponent,
    BannersComponent,
    ProductGroupWidgetEditorComponent,
    ProductGroupTypeComponent,
    CategoriesWidgetEditorComponent,
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
    EmailComponent,
    NumberFieldComponent,
    DropdownComponent,
    EditableDropdownComponent,
    ColorSwatchComponent,
    ColorPickerPopupComponent,
    LinkPopupComponent,
    MediaBrowserPopupComponent,
    ImagePropertyComponent,
    PaginatorComponent,
    ItemListComponent,
    EditableItemListComponent,
    CheckboxItemListComponent
  ]
})
export class PropertiesEditorModule { }
