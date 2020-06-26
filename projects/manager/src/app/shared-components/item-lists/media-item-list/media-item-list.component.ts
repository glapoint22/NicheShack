import { Component, Input, ViewChildren, QueryList, ElementRef, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { EditableItemListComponent } from '../editable-item-list/editable-item-list.component';
import { SelectType } from '../../../classes/list-item-select-type';
import { MediaItem } from '../../../classes/media-item';
import { MediaType } from '../../../classes/media';
import { MenuService } from '../../../services/menu.service';
import { PopupService } from '../../../services/popup.service';

@Component({
  selector: 'media-item-list',
  templateUrl: './media-item-list.component.html',
  styleUrls: ['./media-item-list.component.scss']
})
export class MediaItemListComponent extends EditableItemListComponent implements OnChanges {
  constructor(menuService: MenuService, private popupService: PopupService) { super(menuService) }
  private moveTo = [];
  public selectType = SelectType;
  public mediaTypeEnum = MediaType;
  @Input() listItems: Array<MediaItem>;
  @Input() mediaType: MediaType;
  @Input() addingMediaInProgress: boolean;
  @Input() movingMediaInProgress: boolean;
  @Input() autoSelectedMediaItemIndex: number;
  @ViewChildren('rowItem') rowItem: QueryList<ElementRef>;
  @Output() onAddMedia: EventEmitter<void> = new EventEmitter();
  @Output() onMoveMedia: EventEmitter<MediaType> = new EventEmitter();
  @Output() onMediaSelect: EventEmitter<MediaItem> = new EventEmitter();
  private mediaTypes = [this.menuService.option("Images", null, false, () => { this.onMoveMedia.emit(MediaType.Image) }),
  this.menuService.option("Background Images", null, false, () => { this.onMoveMedia.emit(MediaType.BackgroundImage) }),
  this.menuService.option("Banner Images", null, false, () => { this.onMoveMedia.emit(MediaType.BannerImage) }),
  this.menuService.option("Category Images", null, false, () => { this.onMoveMedia.emit(MediaType.CategoryImage) }),
  this.menuService.option("Product Images", null, false, () => { this.onMoveMedia.emit(MediaType.ProductImage) }),
  this.menuService.option("Icons", null, false, () => { this.onMoveMedia.emit(MediaType.Icon) })]


  // -----------------------------( NG ON CHANGES )------------------------------ \\
  ngOnChanges() {
    // When a list gets loaded in the media browser popup, we want the list item associated with the targeted media to be selected, but only if target media is available
    if (this.autoSelectedMediaItemIndex != null && this.autoSelectedMediaItemIndex != -1 && !this.movingMediaInProgress && !this.addingMediaInProgress && this.indexOfEditedListItem == null) {
      // Call the function that is going to select the list item
      super.onListItemDown(this.autoSelectedMediaItemIndex);

      window.setTimeout(() => {
        // Once the list item is selected, we then have to set focus to it
        this.rowItem.find((item, index) => index == this.autoSelectedMediaItemIndex).nativeElement.focus();
        // Then set the last focused list item as this selected list item
        this.lastFocusedListItem = document.activeElement;
      }, 20)
    }
  }


  // -----------------------------( BUILD CONTEXT MENU )------------------------------ \\
  buildContextMenu(e: MouseEvent) {
    let moveTo = {};
    this.moveTo[MediaType.Image] = this.menuService.subMenu("Move To", this.selectedListItemIndex == null ? true : false, this.mediaTypes[MediaType.BackgroundImage], this.mediaTypes[MediaType.BannerImage], this.mediaTypes[MediaType.CategoryImage], this.mediaTypes[MediaType.ProductImage], this.mediaTypes[MediaType.Icon]);
    this.moveTo[MediaType.BackgroundImage] = this.menuService.subMenu("Move To", this.selectedListItemIndex == null ? true : false, this.mediaTypes[MediaType.Image], this.mediaTypes[MediaType.BannerImage], this.mediaTypes[MediaType.CategoryImage], this.mediaTypes[MediaType.ProductImage], this.mediaTypes[MediaType.Icon]);
    this.moveTo[MediaType.BannerImage] = this.menuService.subMenu("Move To", this.selectedListItemIndex == null ? true : false, this.mediaTypes[MediaType.Image], this.mediaTypes[MediaType.BackgroundImage], this.mediaTypes[MediaType.CategoryImage], this.mediaTypes[MediaType.ProductImage], this.mediaTypes[MediaType.Icon]);
    this.moveTo[MediaType.CategoryImage] = this.menuService.subMenu("Move To", this.selectedListItemIndex == null ? true : false, this.mediaTypes[MediaType.Image], this.mediaTypes[MediaType.BackgroundImage], this.mediaTypes[MediaType.BannerImage], this.mediaTypes[MediaType.ProductImage], this.mediaTypes[MediaType.Icon]);
    this.moveTo[MediaType.ProductImage] = this.menuService.subMenu("Move To", this.selectedListItemIndex == null ? true : false, this.mediaTypes[MediaType.Image], this.mediaTypes[MediaType.BackgroundImage], this.mediaTypes[MediaType.BannerImage], this.mediaTypes[MediaType.CategoryImage], this.mediaTypes[MediaType.Icon]);
    this.moveTo[MediaType.Icon] = this.menuService.subMenu("Move To", this.selectedListItemIndex == null ? true : false, this.mediaTypes[MediaType.Image], this.mediaTypes[MediaType.BackgroundImage], this.mediaTypes[MediaType.BannerImage], this.mediaTypes[MediaType.CategoryImage], this.mediaTypes[MediaType.ProductImage]);
    this.moveTo[MediaType.Video] = {};

    switch (this.mediaType) {
      case MediaType.Image: {
        moveTo = this.moveTo[MediaType.Image];
        break;
      }
      case MediaType.BackgroundImage: {
        moveTo = this.moveTo[MediaType.BackgroundImage];
        break;
      }
      case MediaType.BannerImage: {
        moveTo = this.moveTo[MediaType.BannerImage];
        break;
      }
      case MediaType.CategoryImage: {
        moveTo = this.moveTo[MediaType.CategoryImage];
        break;
      }
      case MediaType.ProductImage: {
        moveTo = this.moveTo[MediaType.ProductImage];
        break;
      }
      case MediaType.Icon: {
        moveTo = this.moveTo[MediaType.Icon];
        break;
      }
      case MediaType.Video: {
        moveTo = this.moveTo[MediaType.Video];
        break;
      }
      case MediaType.Search: {
        moveTo = this.moveTo[this.popupService.mediaType];
        break;
      }
    }

    // If the context menu is being launched while the list is in search mode
    if (this.mediaType == MediaType.Search) {
      this.menuService.buildMenu(this, e.clientX + 3, e.clientY,
        // Edit
        this.menuService.option(this.menuOptions[1], "Ctrl+Alt+E", this.editIcon.isDisabled, this.editListItem),
        // Delete
        this.menuService.option(this.deleteIcon.isDisabled ? this.menuOptions[2] : this.editIcon.isDisabled ? this.menuOptions[3] : this.menuOptions[2], "Delete", this.deleteIcon.isDisabled, this.deleteListItem),
        // Move To
        moveTo
      );

      // If the list is NOT in search mode
    } else {

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
  }


  // -----------------------------( ON LIST ITEM DOWN )------------------------------ \\
  onListItemDown(index: number) {
    super.onListItemDown(index);
    this.onMediaSelect.emit(this.listItems[index]);
  }


  // -----------------------------( DELETE LIST ITEM )------------------------------ \\
  deleteListItem() {
    super.deleteListItem();
    window.setTimeout(() => {
      this.onMediaSelect.emit(this.listItems[this.selectedListItemIndex]);
    }, 50)
  }
}