import { Component, Input, ViewChildren, QueryList, ElementRef, Output, EventEmitter } from '@angular/core';
import { EditableItemListComponent } from '../editable-item-list/editable-item-list.component';
import { SelectType } from '../../../classes/list-item-select-type';
import { MediaItem } from '../../../classes/media-item';
import { MediaType } from '../../../classes/media';

@Component({
  selector: 'media-item-list',
  templateUrl: './media-item-list.component.html',
  styleUrls: ['./media-item-list.component.scss']
})
export class MediaItemListComponent extends EditableItemListComponent {
  public selectType = SelectType;
  @Input() listItems: Array<MediaItem>;
  @Input() mediaType: MediaType;
  @Input() addingMediaInProgress: boolean;
  @Input() movingMediaInProgress: boolean;
  @ViewChildren('rowItem') rowItem: QueryList<ElementRef>;
  @Output() onAddMedia: EventEmitter<void> = new EventEmitter();
  @Output() onMoveMedia: EventEmitter<MediaType> = new EventEmitter();
  @Output() onMediaSelect: EventEmitter<MediaItem> = new EventEmitter();


  // // -----------------------------( SET FOCUS TO LIST ITEM )------------------------------ \\
  // setFocusToListItem() {
  //   let rowItem = this.rowItem.find((item, index) => index == this.indexOfEditedListItem).nativeElement;
  //   rowItem.focus();
  // }


  // -----------------------------( BUILD CONTEXT MENU )------------------------------ \\
  buildContextMenu(e: MouseEvent) {
    let moveTo: Object;
    let images: Object = this.menuService.option("Images", null, false, () => { this.onMoveMedia.emit(MediaType.Image) });
    let backgroundImages: Object = this.menuService.option("Background Images", null, false, () => { this.onMoveMedia.emit(MediaType.BackgroundImage) });
    let bannerImages: Object = this.menuService.option("Banner Images", null, false, () => { this.onMoveMedia.emit(MediaType.BannerImage) });
    let categoryImages: Object = this.menuService.option("Category Images", null, false, () => { this.onMoveMedia.emit(MediaType.CategoryImage) });
    let productImages: Object = this.menuService.option("Product Images", null, false, () => { this.onMoveMedia.emit(MediaType.ProductImage) });
    let icons: Object = this.menuService.option("Icons", null, false, () => { this.onMoveMedia.emit(MediaType.Icon) });

    switch (this.mediaType) {
      case MediaType.Image: {
        moveTo = this.menuService.subMenu("Move To", this.selectedListItemIndex == null ? true : false,
          backgroundImages,
          bannerImages,
          categoryImages,
          productImages,
          icons)
        break;
      }
      case MediaType.BackgroundImage: {
        moveTo = this.menuService.subMenu("Move To", this.selectedListItemIndex == null ? true : false,
          images,
          bannerImages,
          categoryImages,
          productImages,
          icons)
        break;
      }
      case MediaType.BannerImage: {
        moveTo = this.menuService.subMenu("Move To", this.selectedListItemIndex == null ? true : false,
          images,
          backgroundImages,
          categoryImages,
          productImages,
          icons)
        break;
      }
      case MediaType.CategoryImage: {
        moveTo = this.menuService.subMenu("Move To", this.selectedListItemIndex == null ? true : false,
          images,
          backgroundImages,
          bannerImages,
          productImages,
          icons)
        break;
      }
      case MediaType.ProductImage: {
        moveTo = this.menuService.subMenu("Move To", this.selectedListItemIndex == null ? true : false,
          images,
          backgroundImages,
          bannerImages,
          categoryImages,
          icons)
        break;
      }
      case MediaType.Icon: {
        moveTo = this.menuService.subMenu("Move To", this.selectedListItemIndex == null ? true : false,
          images,
          backgroundImages,
          bannerImages,
          categoryImages,
          productImages)
        break;
      }
      case MediaType.Video: {
        moveTo = Object;
        break;
      }
    }



    // Build the context menu
    this.menuService.buildMenu(this, e.clientX + 3, e.clientY,
      // Add
      this.menuService.option(this.menuOptions[0], "Ctrl+Alt+A", this.addIcon.isDisabled, () => this.onAddMedia.emit()),
      // Edit
      this.menuService.option(this.menuOptions[1], "Ctrl+Alt+E", this.editIcon.isDisabled, this.editListItem),
      // Delete
      this.menuService.option(this.deleteIcon.isDisabled ? this.menuOptions[2] : this.editIcon.isDisabled ? this.menuOptions[3] : this.menuOptions[2], "Delete", this.deleteIcon.isDisabled, this.deleteListItem),
      // Move To
      moveTo
    );
  }


  // -----------------------------( ON LIST ITEM DOWN )------------------------------ \\
  onListItemDown(index: number) {
    super.onListItemDown(index);
    this.onMediaSelect.emit(this.listItems[index]);
  }
}