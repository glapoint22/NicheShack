import { Component, Input, ViewChildren, QueryList, ElementRef, Output, EventEmitter, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { EditableItemListComponent } from '../editable-item-list/editable-item-list.component';
import { SelectType } from '../../../classes/list-item-select-type';
import { MediaItem } from '../../../classes/media-item';
import { MediaType } from '../../../classes/media';
import { MenuService } from '../../../services/menu.service';
import { PopupService } from '../../../services/popup.service';
import { PromptService } from '../../../services/prompt.service';
import { FormService } from '../../../services/form.service';
import { MenuOption } from '../../../classes/menu-option';
import { MenuDivider } from '../../../classes/menu-divider';

@Component({
  selector: 'media-item-list',
  templateUrl: './media-item-list.component.html',
  styleUrls: ['./media-item-list.component.scss']
})
export class MediaItemListComponent extends EditableItemListComponent implements OnChanges {
  constructor(menuService: MenuService,
    promptService: PromptService,
    popupService: PopupService,
    private formService: FormService) {
    super(menuService, promptService, popupService)
  }
  // Public
  public selectType = SelectType;
  public mediaTypeEnum = MediaType;
  public mediaAddInitiated: boolean;
  public mediaUpdateInitiated: boolean;

  // Decorators
  @Input() mediaType: MediaType;
  @Input() listItems: Array<MediaItem>;
  @Input() movingMediaInProgress: boolean;
  @Input() addingMediaInProgress: boolean;
  @Input() updatingMediaInProgress: boolean;
  @Input() autoSelectedMediaItemIndex: number;
  @ViewChildren('rowItem') rowItem: QueryList<ElementRef>;
  @Output() onMediaSelect: EventEmitter<MediaItem> = new EventEmitter();


  // -----------------------------( NG ON INIT )------------------------------ \\
  ngOnInit() {
    // When the context menu becomes hidden
    this.menuService.menu.onHide.subscribe(() => {
      // As long as we weren't using the context menu to add a new media item and a list item is selected
      if (!this.mediaAddInitiated && this.selectedListItemIndex != null) {
        // Set the focus back to that list item
        this.setListItemFocus(this.selectedListItemIndex);
      }
    });
  }


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
  onListItemDown(index: number, e?: MouseEvent) {
    super.onListItemDown(index, e);
    this.onMediaSelect.emit(this.listItems[index]);
  }


  // // -----------------------------( EVALUATE EDIT )------------------------------ \\
  // evaluateEdit() {
   




  // }


  // -----------------------------( DELETE LIST ITEM )------------------------------ \\
  // deleteListItem() {
  //   super.deleteListItem();
  //   window.setTimeout(() => {
  //     this.onMediaSelect.emit(this.listItems[this.selectedListItemIndex]);
  //   }, 50)
  // }


  // // -----------------------------( SET LIST ITEM NAME )------------------------------ \\
  // setListItemName() {
  //   // Update the item name
  //   this.updateItemName.emit(this.listItems[this.indexOfEditedListItem]);
  // }


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