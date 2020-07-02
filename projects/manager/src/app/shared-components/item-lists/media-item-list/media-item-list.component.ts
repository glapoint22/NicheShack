import { Component, Input, ViewChildren, QueryList, ElementRef, Output, EventEmitter, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { EditableItemListComponent } from '../editable-item-list/editable-item-list.component';
import { SelectType } from '../../../classes/list-item-select-type';
import { MediaItem } from '../../../classes/media-item';
import { MediaType } from '../../../classes/media';
import { MenuService } from '../../../services/menu.service';
import { PopupService } from '../../../services/popup.service';
import { PromptService } from '../../../services/prompt.service';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'media-item-list',
  templateUrl: './media-item-list.component.html',
  styleUrls: ['./media-item-list.component.scss']
})
export class MediaItemListComponent extends EditableItemListComponent implements OnChanges {
  constructor(menuService: MenuService, promptService: PromptService, private popupService: PopupService, private formService: FormService) { super(menuService, promptService) }
  // Public
  public selectType = SelectType;
  public mediaTypeEnum = MediaType;
  public mediaAddInitiated: boolean;
  public mediaUpdateInitiated: boolean;

  // Private
  private moveTo = [];
  private mediaTypes = [this.menuService.option("Images", null, false, () => { this.onMoveMedia.emit(MediaType.Image) }),
  this.menuService.option("Background Images", null, false, () => { this.onMoveMedia.emit(MediaType.BackgroundImage) }),
  this.menuService.option("Banner Images", null, false, () => { this.onMoveMedia.emit(MediaType.BannerImage) }),
  this.menuService.option("Category Images", null, false, () => { this.onMoveMedia.emit(MediaType.CategoryImage) }),
  this.menuService.option("Product Images", null, false, () => { this.onMoveMedia.emit(MediaType.ProductImage) }),
  this.menuService.option("Icons", null, false, () => { this.onMoveMedia.emit(MediaType.Icon) })];

  // Decorators
  @Input() mediaType: MediaType;
  @Input() listItems: Array<MediaItem>;
  @Input() movingMediaInProgress: boolean;
  @Input() addingMediaInProgress: boolean;
  @Input() updatingMediaInProgress: boolean;
  @Input() autoSelectedMediaItemIndex: number;
  @ViewChildren('rowItem') rowItem: QueryList<ElementRef>;
  @Output() onAddMedia: EventEmitter<void> = new EventEmitter();
  @Output() onUpdateMedia: EventEmitter<number> = new EventEmitter();
  @Output() onMoveMedia: EventEmitter<MediaType> = new EventEmitter();
  @Output() onMediaSelect: EventEmitter<MediaItem> = new EventEmitter();


  // -----------------------------( ON WINDOW FOCUS )------------------------------ \\
  @HostListener('window:focus')
  onWindowFocus() {
    // As long as we're NOT adding or updating a video
    if (this.popupService.mediaType != MediaType.Video) {
      // Set the focus back to the list
      this.setFocusToList();
    }
  }


  // -----------------------------( NG ON CHANGES )------------------------------ \\
  ngOnChanges(changes: SimpleChanges) {
    // When a list gets loaded in the media browser popup, we want the list item associated with the targeted media to be selected, but only if target media is available
    if (changes['autoSelectedMediaItemIndex'] && changes['autoSelectedMediaItemIndex'].currentValue != null && changes['autoSelectedMediaItemIndex'].currentValue != -1) {
      // Call the function that is going to select the list item
      super.onListItemDown(this.autoSelectedMediaItemIndex);

      window.setTimeout(() => {
        // Once the list item is selected, we then have to set focus to it
        this.setListItemFocus(this.autoSelectedMediaItemIndex);
      }, 20)
    }
  }


  // -----------------------------( BUILD CONTEXT MENU )------------------------------ \\
  buildContextMenu(e: MouseEvent) {
    let moveTo = {};
    this.moveTo[MediaType.Image] = this.menuService.subMenu("Move Image" + (this.editIcon.isDisabled ? "s" : "") + " To", this.selectedListItemIndex == null ? true : false, this.mediaTypes[MediaType.BackgroundImage], this.mediaTypes[MediaType.BannerImage], this.mediaTypes[MediaType.CategoryImage], this.mediaTypes[MediaType.ProductImage], this.mediaTypes[MediaType.Icon]);
    this.moveTo[MediaType.BackgroundImage] = this.menuService.subMenu("Move Background Image" + (this.editIcon.isDisabled ? "s" : "") + " To", this.selectedListItemIndex == null ? true : false, this.mediaTypes[MediaType.Image], this.mediaTypes[MediaType.BannerImage], this.mediaTypes[MediaType.CategoryImage], this.mediaTypes[MediaType.ProductImage], this.mediaTypes[MediaType.Icon]);
    this.moveTo[MediaType.BannerImage] = this.menuService.subMenu("Move Banner Image" + (this.editIcon.isDisabled ? "s" : "") + " To", this.selectedListItemIndex == null ? true : false, this.mediaTypes[MediaType.Image], this.mediaTypes[MediaType.BackgroundImage], this.mediaTypes[MediaType.CategoryImage], this.mediaTypes[MediaType.ProductImage], this.mediaTypes[MediaType.Icon]);
    this.moveTo[MediaType.CategoryImage] = this.menuService.subMenu("Move Category Image" + (this.editIcon.isDisabled ? "s" : "") + " To", this.selectedListItemIndex == null ? true : false, this.mediaTypes[MediaType.Image], this.mediaTypes[MediaType.BackgroundImage], this.mediaTypes[MediaType.BannerImage], this.mediaTypes[MediaType.ProductImage], this.mediaTypes[MediaType.Icon]);
    this.moveTo[MediaType.ProductImage] = this.menuService.subMenu("Move Product Image" + (this.editIcon.isDisabled ? "s" : "") + " To", this.selectedListItemIndex == null ? true : false, this.mediaTypes[MediaType.Image], this.mediaTypes[MediaType.BackgroundImage], this.mediaTypes[MediaType.BannerImage], this.mediaTypes[MediaType.CategoryImage], this.mediaTypes[MediaType.Icon]);
    this.moveTo[MediaType.Icon] = this.menuService.subMenu("Move Icon" + (this.editIcon.isDisabled ? "s" : "") + " To", this.selectedListItemIndex == null ? true : false, this.mediaTypes[MediaType.Image], this.mediaTypes[MediaType.BackgroundImage], this.mediaTypes[MediaType.BannerImage], this.mediaTypes[MediaType.CategoryImage], this.mediaTypes[MediaType.ProductImage]);
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

    if (this.selectedListItemIndex != null) {
      this.menuService.buildMenu(this, e.clientX + 3, e.clientY,
        // Add
        this.menuService.option(this.menuOptions[0], "Ctrl+Alt+N", this.addIcon.isDisabled, () => { this.mediaAddInitiated = true; this.onAddMedia.emit() }),
        this.menuService.divider(),
        // Update
        this.menuService.option(this.menuOptions[2], "Ctrl+Alt+U", this.editIcon.isDisabled, () => { this.mediaUpdateInitiated = true; this.onUpdateMedia.emit(this.selectedListItemIndex) }),
        // Edit
        this.menuService.option(this.menuOptions[1], "Ctrl+Alt+E", this.editIcon.isDisabled, this.onListItemEdit),

        this.menuService.divider(),

        // Move To
        moveTo,

        // Delete
        this.menuService.option(this.deleteIcon.isDisabled ? this.menuOptions[3] : this.editIcon.isDisabled ? this.menuOptions[4] : this.menuOptions[3], "Delete", this.deleteIcon.isDisabled, this.onListItemDelete)
      );
    } else {
      this.menuService.buildMenu(this, e.clientX + 3, e.clientY,
        // Add
        this.menuService.option(this.menuOptions[0], null, this.addIcon.isDisabled, () => { this.mediaAddInitiated = true; this.onAddMedia.emit() })
      );
    }
  }


  // -----------------------------( SET FOCUS TO LIST )------------------------------ \\
  setFocusToList() {
    // If we're adding an image
    if (this.mediaAddInitiated) this.mediaAddInitiated = false;

    // If we're updating an image
    if (this.mediaUpdateInitiated) {
      this.mediaUpdateInitiated = false;

      // Put the focus back to the selected media item when updating is all done
      this.setListItemFocus(this.selectedListItemIndex);
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


  // -----------------------------( SET LIST ITEM NAME )------------------------------ \\
  setListItemName() {
    // Update the item name
    this.updateItemName.emit(this.listItems[this.selectedListItemIndex])
  }


  // -----------------------------( REMOVE EVENT LISTENERS )------------------------------ \\
  removeEventListeners() {
    if (!this.mediaUpdateInitiated) {
      super.removeEventListeners();
    }
  }


  // -----------------------------( ESCAPE )------------------------------ \\
  escape() {
    // As long as the video url form is NOT open
    if (!this.formService.videoUrlForm.show) {
      super.escape();
    }
  }
}