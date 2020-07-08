import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from './shared-components/loading/loading.component';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';
import { VendorFormComponent } from './shared-components/forms/vendor-form/vendor-form.component';
import { FormComponent } from './shared-components/forms/form/form.component';
import { FormsModule } from '@angular/forms';
import { VideoUrlFormComponent } from './shared-components/forms/video-url-form/video-url-form.component';
import { ContextMenuComponent } from './shared-components/context-menu/context-menu.component';
import { DropdownMenuComponent } from './shared-components/elements/dropdowns/dropdown-menu/dropdown-menu.component';
import { ColorPickerPopupComponent } from './shared-components/popups/color-picker-popup/color-picker-popup.component';
import { NormalizedNumberFieldComponent } from './shared-components/elements/number-fields/normalized-number-field/normalized-number-field.component';
import { LinkPopupComponent } from './shared-components/popups/link-popup/link-popup.component';
import { CustomInputModule } from 'shared-components/custom-input/custom-input.module';
import { HoplinkPopupComponent } from './shared-components/popups/hoplink-popup/hoplink-popup.component';
import { SearchPopupComponent } from './shared-components/popups/search-popup/search-popup.component';
import { CoverComponent } from './shared-components/cover/cover.component';
import { NotificationListPopupComponent } from './shared-components/popups/notification-popups/notification-list-popup/notification-list-popup.component';
import { MessageNotificationPopupComponent } from './shared-components/popups/notification-popups/message-notification-popup/message-notification-popup.component';
import { ReviewComplaintNotificationPopupComponent } from './shared-components/popups/notification-popups/review-complaint-notification-popup/review-complaint-notification-popup.component';
import { ProductDescriptionNotificationPopupComponent } from './shared-components/popups/notification-popups/product-description-notification-popup/product-description-notification-popup.component';
import { ProductImageNotificationPopupComponent } from './shared-components/popups/notification-popups/product-image-notification-popup/product-image-notification-popup.component';
import { ProductMediaNotificationPopupComponent } from './shared-components/popups/notification-popups/product-media-notification-popup/product-media-notification-popup.component';
import { ProductContentNotificationPopupComponent } from './shared-components/popups/notification-popups/product-content-notification-popup/product-content-notification-popup.component';
import { PricePointPopupComponent } from './pages/niche-shack-editor/product-editor/product-properties/product-content/price-point-popup/price-point-popup.component';
import { MediaBrowserPopupComponent } from './shared-components/popups/media-browser-popup/media-browser-popup.component';
import { PromptModule } from './shared-components/prompt/prompt.module';
import { NicheShackHierarchyPopupComponent } from './shared-components/popups/niche-shack-hierarchy-popup/niche-shack-hierarchy-popup.component';
import { GeneralNotificationPopupComponent } from './shared-components/popups/notification-popups/general-notification-popup/general-notification-popup.component';
import { FiltersFormComponent } from './shared-components/forms/filters-form/filters-form.component';
import { HighlightPopupComponent } from './shared-components/popups/highlight-popup/highlight-popup.component';
import { ProductsFormComponent } from './shared-components/forms/products-form/products-form.component';
import { HierarchyComponent } from './shared-components/hierarchy/hierarchy.component';
import { EditableHierarchyComponent } from './shared-components/hierarchy/editable-hierarchy/editable-hierarchy.component';
import { HierarchyContentComponent } from './shared-components/hierarchy/hierarchy-content/hierarchy-content.component';
import { PopupComponent } from './shared-components/popups/popup/popup.component';
import { ShackIconComponent } from './shared-components/shack-icon/shack-icon.component';
import { MenuBarComponent } from './shared-components/menu-bar/menu-bar.component';
import { SharedModule } from './shared-components/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    FormComponent,
    VendorFormComponent,
    VideoUrlFormComponent,
    ContextMenuComponent,
    DropdownMenuComponent,
    ColorPickerPopupComponent,
    NormalizedNumberFieldComponent,
    LinkPopupComponent,
    HoplinkPopupComponent,
    SearchPopupComponent,
    CoverComponent,
    NotificationListPopupComponent,
    MessageNotificationPopupComponent,
    ReviewComplaintNotificationPopupComponent,
    ProductDescriptionNotificationPopupComponent,
    ProductImageNotificationPopupComponent,
    ProductMediaNotificationPopupComponent,
    ProductContentNotificationPopupComponent,
    PricePointPopupComponent,
    MediaBrowserPopupComponent,
    NicheShackHierarchyPopupComponent,
    GeneralNotificationPopupComponent,
    FiltersFormComponent,
    HighlightPopupComponent,
    ProductsFormComponent,
    HierarchyComponent,
    EditableHierarchyComponent,
    HierarchyContentComponent,
    PopupComponent,
    ShackIconComponent,
    MenuBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShowHideModule,
    FormsModule,
    CustomInputModule,
    PromptModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
