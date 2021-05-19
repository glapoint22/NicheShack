import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { MediaItem } from '../../../classes/media-item';
import { of, fromEvent, Subscription, Subject } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { MediaType, Media } from '../../../classes/media';
import { MediaItemListComponent } from '../../item-lists/media-item-list/media-item-list.component';
import { DropdownComponent } from '../../elements/dropdowns/dropdown/dropdown.component';
import { PopupService } from '../../../services/popup.service';
import { CoverService } from '../../../services/cover.service';
import { MenuService } from '../../../services/menu.service';
import { DropdownMenuService } from '../../../services/dropdown-menu.service';
import { KeyValue } from '@angular/common';
import { FormService } from '../../../services/form.service';
import { ItemListOptions } from '../../../classes/item-list-options';
import { MenuOption } from '../../../classes/menu-option';
import { MenuDivider } from '../../../classes/menu-divider';
import { SubMenuOption } from '../../../classes/sub-menu-option';
import { DataService } from 'services/data.service';
import { PromptService } from 'services/prompt.service';

@Component({
  selector: 'media-browser-popup',
  templateUrl: './media-browser-popup.component.html',
  styleUrls: ['../popup/popup.component.scss', './media-browser-popup.component.scss']
})
export class MediaBrowserPopupComponent extends PopupComponent implements OnInit {
  public onMediaChange = new Subject<Media>();
  public media: Media;
  public noMedia: boolean;
  public mediaType = MediaType;
  public updatingMediaIndex: number;
  public addingMediaInProgress: boolean;
  public movingMediaInProgress: boolean;
  public loadingMediaInProgress: boolean;
  public indexOfCurrentMediaList: number;
  public itemListOptions: ItemListOptions;
  public updatingMediaInProgress: boolean;
  public autoSelectedMediaItemIndex: number;
  public dropdownOptions: Array<KeyValue<any, MediaType>>;
  public mediaLists: MediaItem[][] = [[], [], [], [], [], [], [], [], []];
  private dropdownList: Array<KeyValue<any, MediaType>> =
    [
      { key: 'Images', value: MediaType.Image },
      { key: 'Background Images', value: MediaType.BackgroundImage },
      { key: 'Banner Images', value: MediaType.BannerImage },
      { key: 'Category Images', value: MediaType.CategoryImage },
      { key: 'Niche Images', value: MediaType.NicheImage },
      { key: 'Product Images', value: MediaType.ProductImage },
      { key: 'Product Media Images', value: MediaType.ProductMediaImage },
      { key: 'Product Price Images', value: MediaType.ProductPriceImage },
      { key: 'Videos', value: MediaType.Video }
    ];

  public menuOptions = [
    { new: 'New Image', edit: 'Edit Image Name', update: 'Update Image', delete: 'Delete Image', deletes: 'Delete Images' },
    { new: 'New Background Image', edit: 'Edit Background Image Name', update: 'Update Background Image', delete: 'Delete Background Image', deletes: 'Delete Background Images' },
    { new: 'New Banner Image', edit: 'Edit Banner Image Name', update: 'Update Banner Image', delete: 'Delete Banner Image', deletes: 'Delete Banner Images' },
    { new: 'New Category Image', edit: 'Edit Category Image Name', update: 'Update Category Image', delete: 'Delete Category Image', deletes: 'Delete Category Images' },
    { new: 'New Niche Image', edit: 'Edit Niche Image Name', update: 'Update Niche Image', delete: 'Delete Niche Image', deletes: 'Delete Niche Images' },
    { new: 'New Product Image', edit: 'Edit Product Image Name', update: 'Update Product Image', delete: 'Delete Product Image', deletes: 'Delete Product Images' },
    { new: 'New Product Media Image', edit: 'Edit Product Media Image Name', update: 'Update Product Media Image', delete: 'Delete Product Media Image', deletes: 'Delete Product Media Images' },
    { new: 'New Icon', edit: 'Edit Icon Name', update: 'Update Icon', delete: 'Delete Icon', deletes: 'Delete Icons' },
    { new: 'New Video', edit: 'Edit Video Name', update: 'Update Video', delete: 'Delete Video', deletes: 'Delete Videos' }, {}
  ];

  @ViewChild('dropdown', { static: false }) dropdown: DropdownComponent;
  @ViewChild('itemList', { static: false }) itemList: MediaItemListComponent;
  @ViewChild('mediaSelectInput', { static: false }) mediaSelectInput: ElementRef;





  constructor(popupService: PopupService,
    cover: CoverService,
    menuService: MenuService,
    dropdownMenuService: DropdownMenuService,
    dataService: DataService,
    private formService: FormService,
    private promptService: PromptService) {
    super(popupService, cover, menuService, dropdownMenuService, dataService);
  }





  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.popupService.mediaBrowserPopup = this;

    // Define the item list options
    this.itemListOptions = {
      // Current Object
      currentObj: this,
      // Menu Options
      menuOptions: () => {


        // If a media item is NOT selected
        if (this.itemList.selectedListItemIndex == null) {
          // New Media Item
          return [new MenuOption(this.menuOptions[this.indexOfCurrentMediaList].new, this.itemList.addIcon.isDisabled, this.onListItemAdd, null, 'Ctrl+Alt+N')]


          // If a media item is selected
        } else {


          // If the media type is a video
          if (this.popupService.mediaType == MediaType.Video) {
            return [
              // New Media Item
              new MenuOption(this.menuOptions[this.indexOfCurrentMediaList].new, this.itemList.addIcon.isDisabled, this.onListItemAdd, null, 'Ctrl+Alt+N'),
              // Divider
              new MenuDivider(),
              // Update
              new MenuOption(this.menuOptions[this.indexOfCurrentMediaList].update, this.itemList.editIcon.isDisabled, this.onListItemUpdate, null, 'Ctrl+Alt+U'),
              // Edit Media Item
              new MenuOption(this.menuOptions[this.indexOfCurrentMediaList].edit, this.itemList.editIcon.isDisabled, this.onListItemEdit, null, 'Ctrl+Alt+E')
              // Divider
              // new MenuDivider(),
              // Delete Media Item
              // new MenuOption(!this.itemList.isMultiSelected ? this.menuOptions[this.indexOfCurrentMediaList].delete : this.menuOptions[this.indexOfCurrentMediaList].deletes, this.itemList.deleteIcon.isDisabled, this.onListItemDelete, null, 'Delete')
            ]

            // If the media type is anything but a video
          } else {

            return [
              // New Media Item
              new MenuOption(this.menuOptions[this.indexOfCurrentMediaList].new, this.itemList.addIcon.isDisabled, this.onListItemAdd, null, 'Ctrl+Alt+N'),
              // Divider
              new MenuDivider(),
              // Update
              new MenuOption(this.menuOptions[this.indexOfCurrentMediaList].update, this.itemList.editIcon.isDisabled, this.onListItemUpdate, null, 'Ctrl+Alt+U'),
              // Edit Media Item
              new MenuOption(this.menuOptions[this.indexOfCurrentMediaList].edit, this.itemList.editIcon.isDisabled, this.onListItemEdit, null, 'Ctrl+Alt+E')
              // Divider
              // new MenuDivider(),
              // Move To
              // this.moveTo(),
              // Delete Media Item
              // new MenuOption(!this.itemList.isMultiSelected ? this.menuOptions[this.indexOfCurrentMediaList].delete : this.menuOptions[this.indexOfCurrentMediaList].deletes, this.itemList.deleteIcon.isDisabled, this.onListItemDelete, null, 'Delete')
            ]
          }
        }
      },
      // On Add Item
      onEditItem: this.updateMediaName,
      // On Delete Item
      onDeleteItem: this.openDeletePrompt,
      multiSelect: false
    }
  }


  // --------------------------------( MOVE TO )-------------------------------- \\
  // moveTo() {
  //   let options: Array<MenuOption> = [
  //     new MenuOption('Images', false, this.onMoveMedia, [MediaType.Image]),
  //     new MenuOption('Background Images', false, this.onMoveMedia, [MediaType.BackgroundImage]),
  //     new MenuOption('Banner Images', false, this.onMoveMedia, [MediaType.BannerImage]),
  //     new MenuOption('Category Images', false, this.onMoveMedia, [MediaType.CategoryImage]),
  //     new MenuOption('Product Images', false, this.onMoveMedia, [MediaType.ProductImage]),
  //     new MenuOption('Product Media Images', false, this.onMoveMedia, [MediaType.ProductMediaImage]),
  //     new MenuOption('Icons', false, this.onMoveMedia, [MediaType.Icon])
  //   ];

  //   let subMenus: Array<SubMenuOption> = [
  //     new SubMenuOption('Move Image' + (!this.itemList.isMultiSelected ? '' : 's') + ' To', this.itemList.selectedListItemIndex == null ? true : false, [options[MediaType.BackgroundImage], options[MediaType.BannerImage], options[MediaType.CategoryImage], options[MediaType.ProductImage], options[MediaType.ProductMediaImage], options[MediaType.Icon]]),
  //     new SubMenuOption('Move Background Image' + (!this.itemList.isMultiSelected ? '' : 's') + ' To', this.itemList.selectedListItemIndex == null ? true : false, [options[MediaType.Image], options[MediaType.BannerImage], options[MediaType.CategoryImage], options[MediaType.ProductImage], options[MediaType.ProductMediaImage], options[MediaType.Icon]]),
  //     new SubMenuOption('Move Banner Image' + (!this.itemList.isMultiSelected ? '' : 's') + ' To', this.itemList.selectedListItemIndex == null ? true : false, [options[MediaType.Image], options[MediaType.BackgroundImage], options[MediaType.CategoryImage], options[MediaType.ProductImage], options[MediaType.ProductMediaImage], options[MediaType.Icon]]),
  //     new SubMenuOption('Move Category Image' + (!this.itemList.isMultiSelected ? '' : 's') + ' To', this.itemList.selectedListItemIndex == null ? true : false, [options[MediaType.Image], options[MediaType.BackgroundImage], options[MediaType.BannerImage], options[MediaType.ProductImage], options[MediaType.ProductMediaImage], options[MediaType.Icon]]),
  //     new SubMenuOption('Move Product Image' + (!this.itemList.isMultiSelected ? '' : 's') + ' To', this.itemList.selectedListItemIndex == null ? true : false, [options[MediaType.Image], options[MediaType.BackgroundImage], options[MediaType.BannerImage], options[MediaType.CategoryImage], options[MediaType.ProductMediaImage], options[MediaType.Icon]]),
  //     new SubMenuOption('Move Product Media Image' + (!this.itemList.isMultiSelected ? '' : 's') + ' To', this.itemList.selectedListItemIndex == null ? true : false, [options[MediaType.Image], options[MediaType.BackgroundImage], options[MediaType.BannerImage], options[MediaType.CategoryImage], options[MediaType.ProductImage], options[MediaType.Icon]]),
  //     new SubMenuOption('Move Icon' + (!this.itemList.isMultiSelected ? '' : 's') + ' To', this.itemList.selectedListItemIndex == null ? true : false, [options[MediaType.Image], options[MediaType.BackgroundImage], options[MediaType.BannerImage], options[MediaType.CategoryImage], options[MediaType.ProductImage], options[MediaType.ProductMediaImage]])
  //   ];

  //   switch (this.popupService.mediaType) {
  //     case MediaType.Image: {
  //       return subMenus[MediaType.Image];
  //     }
  //     case MediaType.BackgroundImage: {
  //       return subMenus[MediaType.BackgroundImage];
  //     }
  //     case MediaType.BannerImage: {
  //       return subMenus[MediaType.BannerImage];
  //     }
  //     case MediaType.CategoryImage: {
  //       return subMenus[MediaType.CategoryImage];
  //     }
  //     case MediaType.ProductImage: {
  //       return subMenus[MediaType.ProductImage];
  //     }
  //     case MediaType.ProductMediaImage: {
  //       return subMenus[MediaType.ProductMediaImage];
  //     }
  //     case MediaType.Icon: {
  //       return subMenus[MediaType.Icon];
  //     }
  //     case MediaType.Search: {
  //       return subMenus[this.popupService.mediaType];
  //     }
  //   }
  // }


  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    super.onPopupShow(popup, arrow);
    this.setMediaSearch();
    this.displayMedia(this.popupService.mediaType);
    this.setDropdownOptions();
  }


  // -----------------------------( ON LIST ITEM ADD )------------------------------ \\
  onListItemAdd() {
    this.itemList.mediaAddInitiated = true;
    this.openForm(this.mediaSelectInput.nativeElement);
  }


  // -----------------------------( ON LIST ITEM UPDATE )------------------------------ \\
  onListItemUpdate() {
    this.itemList.mediaUpdateInitiated = true;
    this.openForm(this.mediaSelectInput.nativeElement, this.itemList.selectedListItemIndex);
  }


  // -----------------------------( ON LIST ITEM EDIT )------------------------------ \\
  onListItemEdit() {
    this.itemList.onListItemEdit();
  }


  // -----------------------------( ON LIST ITEM DELETE )------------------------------ \\
  onListItemDelete() {
    this.itemList.onListItemDelete();
  }


  // -----------------------------( OPEN DELETE PROMPT )------------------------------ \\
  openDeletePrompt() {
    let promptTitle: string;
    let promptMessage: string;
    this.itemList.itemDeletionPending = true;

    // Set delete prompt title and message
    switch (this.popupService.mediaType) {
      case MediaType.Image: {
        promptTitle = !this.itemList.isMultiSelected ? 'Delete Image' : 'Delete Images';
        promptMessage = !this.itemList.isMultiSelected ? 'Are you sure you want to delete the selected image?' : 'Are you sure you want to delete all the selected images?';
        break;
      }
      case MediaType.BackgroundImage: {
        promptTitle = !this.itemList.isMultiSelected ? 'Delete Background Image' : 'Delete Background Images';
        promptMessage = !this.itemList.isMultiSelected ? 'Are you sure you want to delete the selected background image?' : 'Are you sure you want to delete all the selected background images?';
        break;
      }
      case MediaType.BannerImage: {
        promptTitle = !this.itemList.isMultiSelected ? 'Delete Banner Image' : 'Delete Banner Images';
        promptMessage = !this.itemList.isMultiSelected ? 'Are you sure you want to delete the selected banner image?' : 'Are you sure you want to delete all the selected banner images?';
        break;
      }
      case MediaType.CategoryImage: {
        promptTitle = !this.itemList.isMultiSelected ? 'Delete Category Image' : 'Delete Category Images';
        promptMessage = !this.itemList.isMultiSelected ? 'Are you sure you want to delete the selected category image?' : 'Are you sure you want to delete all the selected category images?';
        break;
      }
      case MediaType.NicheImage: {
        promptTitle = !this.itemList.isMultiSelected ? 'Delete Niche Image' : 'Delete Niche Images';
        promptMessage = !this.itemList.isMultiSelected ? 'Are you sure you want to delete the selected niche image?' : 'Are you sure you want to delete all the selected niche images?';
        break;
      }
      case MediaType.ProductImage: {
        promptTitle = !this.itemList.isMultiSelected ? 'Delete Product Image' : 'Delete Product Images';
        promptMessage = !this.itemList.isMultiSelected ? 'Are you sure you want to delete the selected product image?' : 'Are you sure you want to delete all the selected product images?';
        break;
      }
      case MediaType.ProductMediaImage: {
        promptTitle = !this.itemList.isMultiSelected ? 'Delete Product Media Image' : 'Delete Product Media Images';
        promptMessage = !this.itemList.isMultiSelected ? 'Are you sure you want to delete the selected product Media image?' : 'Are you sure you want to delete all the selected product Media images?';
        break;
      }
      case MediaType.ProductPriceImage: {
        promptTitle = !this.itemList.isMultiSelected ? 'Delete Product Price Image' : 'Delete Product Price Images';
        promptMessage = !this.itemList.isMultiSelected ? 'Are you sure you want to delete the selected product price image?' : 'Are you sure you want to delete all the selected product price images?';
        break;
      }
      case MediaType.Video: {
        promptTitle = !this.itemList.isMultiSelected ? 'Delete Video' : 'Delete Videos';
        promptMessage = !this.itemList.isMultiSelected ? 'Are you sure you want to delete the selected video?' : 'Are you sure you want to delete all the selected videos?';
        break;
      }
    }
    this.promptService.showPrompt(promptTitle, promptMessage, this.deleteMediaItem, this, null, this.onPromptCancel);
  }


  // -----------------------------( UPDATE MEDIA NAME )------------------------------ \\
  updateMediaName(mediaItem: MediaItem) {
    mediaItem.loading = true;
    this.dataService.put(

      'api/Media/Name', mediaItem)
      .subscribe(() => {
        mediaItem.loading = false;
      });
  }


  // -----------------------------( DELETE MEDIA ITEM )------------------------------ \\
  deleteMediaItem() {
    // let deletedMediaItems: Array<ListItem> = this.itemList.deleteListItem();

    // this.dataService.delete('api/Media', {id: deletedMediaItems[0].id}).subscribe();

    // window.setTimeout(() => {
    //   this.onMediaSelect(this.itemList.listItems[this.itemList.selectedListItemIndex]);
    // }, 50)
  }


  // -----------------------------( ON PROMPT CANCEL )------------------------------ \\
  onPromptCancel() {
    this.itemList.onPromptCancel()
  }


  // -----------------------------( SET MEDIA SEARCH )------------------------------ \\
  setMediaSearch() {
    let searchInput = document.getElementById('search-input') as HTMLInputElement;
    let onInputChange = fromEvent(searchInput, 'input');
    let searchResults = onInputChange.pipe(debounceTime(250), switchMap(() => {

      // If the search input text is empty
      if (searchInput.value == '') {
        // Stop the spinner
        this.loadingMediaInProgress = false;
        // Return to the media list we were on before the search
        this.indexOfCurrentMediaList = this.popupService.mediaType;
        // Select the appropriate media item in the list
        this.autoSelectMediaItem();
        return of();
      }

      // But if the search input text is NOT empty, then turn on the spinner
      this.loadingMediaInProgress = true;
      // Return the search results
      return this.dataService.get('api/Media/Search', [{ key: 'type', value: this.popupService.mediaType }, { key: 'searchWords', value: searchInput.value }]);
    }));

    // If a match was found
    searchResults.subscribe((mediaItems: MediaItem[]) => {

      this.indexOfCurrentMediaList = MediaType.Search;
      this.loadingMediaInProgress = false;
      this.mediaLists[this.indexOfCurrentMediaList] = mediaItems;
      // Select the appropriate media item in the list
      this.autoSelectMediaItem();
    });
  }


  // -----------------------------( SET MEDIA SEARCH MENU OPTIONS )------------------------------ \\
  setMediaSearchMenuOptions() {
    this.menuOptions[MediaType.Search] = {
      new: this.menuOptions[this.popupService.mediaType].new,
      edit: this.menuOptions[this.popupService.mediaType].edit,
      update: this.menuOptions[this.popupService.mediaType].update,
      delete: this.menuOptions[this.popupService.mediaType].delete,
      deletes: this.menuOptions[this.popupService.mediaType].deletes
    };
  }


  // -----------------------------( SET DROPDOWN OPTIONS )------------------------------ \\
  setDropdownOptions() {
    // Clear the dropdown list so it can be rebuilt
    this.dropdownOptions = [];

    // If the media type is video
    if (this.indexOfCurrentMediaList == MediaType.Video) {
      // Build the list with just one dropdown option (Video)
      this.dropdownOptions[0] = this.dropdownList[MediaType.Video];

      // If the media type is anything other than video
    } else {

      // Build the list with all the media dropdown options except the video option
      this.dropdownOptions = this.dropdownList.filter(x => x.value != MediaType.Video);
    }
  }


  // -----------------------------( DISPLAY MEDIA )------------------------------ \\
  displayMedia(mediaType: MediaType) {
    this.noMedia = false;
    this.indexOfCurrentMediaList = mediaType;

    // If the list has NOT been loaded from the database yet
    if (this.mediaLists[this.indexOfCurrentMediaList].length == 0) {
      // Show the loading spinner
      this.loadingMediaInProgress = true;

      // Then fetch the data
      this.dataService.get('api/Media', [{ key: 'type', value: this.indexOfCurrentMediaList }])
        .subscribe((mediaItems: MediaItem[]) => {
          // After loading is complete, hide the spinner
          this.loadingMediaInProgress = false;

          // If the data came back empty
          if (mediaItems.length == 0) {
            // Display the no media text
            this.noMedia = true;

            // But if data was retrieved
          } else {
            // Display the media list
            this.mediaLists[this.indexOfCurrentMediaList] = mediaItems;
            // Select the appropriate media item in the list
            this.autoSelectMediaItem();
          }
        })

      // If the list has already been loaded from the database
    } else {
      // Select the appropriate media item in the list
      this.autoSelectMediaItem();
    }
    this.setMediaSearchMenuOptions();
  }


  // -----------------------------( AUTO SELECT MEDIA ITEM )------------------------------ \\
  autoSelectMediaItem() {
    this.autoSelectedMediaItemIndex = null;
    // If the current media list is videos
    if (this.indexOfCurrentMediaList == MediaType.Video) {

      // Find a match between the target media and a media item in the list using the thumbnail property
      this.autoSelectedMediaItemIndex = this.mediaLists[this.indexOfCurrentMediaList].findIndex(x => {
        // As long as the media property is assigned, 
        // if the media property is NOT assigned, it means the target media was never loaded
        if (this.media != null) return x.thumbnail == this.media.thumbnail
      });

      // When the current media list is everything other than videos
    } else {

      // Find a match between the target media and a media item in the list using the url property
      this.autoSelectedMediaItemIndex = this.mediaLists[this.indexOfCurrentMediaList].findIndex(x => {
        // As long as the media property is assigned, 
        // if the media property is NOT assigned, it means the target media was never loaded
        if (this.media != null) return x.url == this.media.url
      });
    }
  }


  // -----------------------------( ON DROPDOWN CHANGE )------------------------------ \\
  onDropdownChange(mediaType: MediaType, searchInputValue: HTMLInputElement) {
    this.popupService.mediaType = mediaType;
    this.displayMedia(mediaType);
    searchInputValue.value = '';
  }


  // --------------------------------( ON MEDIA SELECT )-------------------------------- \\
  onMediaSelect(mediaItem: MediaItem) {
    // If the media item being passed in, no longer resides in the current list
    if (mediaItem == null) {

      // If the current media is video
      if (this.popupService.mediaType == MediaType.Video) {
        // Set the thumbnail property of that media item to null
        this.media.thumbnail = null;

        // When the current media is anything other than video
      } else {
        // Set the url property of that media item to null
        this.media.url = null;
      }

      // If the media item being passed in is still in the list
    } else {

      if (this.media.id != mediaItem.id) {
        // Update the media properties with the properties of the selected media item
        this.media.id = mediaItem.id;
        this.media.url = mediaItem.url;
        this.media.type = mediaItem.type;
        this.media.thumbnail = mediaItem.thumbnail;
        this.media.name = mediaItem.name;

        this.onMediaChange.next(this.media);
      }
    }
  }


  // -----------------------------( OPEN FORM )------------------------------ \\
  openForm(mediaSelectInput: HTMLInputElement, selectedMediaIndex?: number) {
    // If the selectedMediaIndex has a value, then we are updating. If not, we are adding
    this.updatingMediaIndex = selectedMediaIndex;

    // If the media we're adding is a video
    if (this.indexOfCurrentMediaList == MediaType.Video) {
      let videoSubscription: Subscription;

      // Open the video url form
      this.formService.videoUrlForm.show = true;
      // When the submit button is clicked on the video url form
      videoSubscription = this.formService.onVideoUrlFormSubmit.subscribe((url: string) => {

        // If a url is defined, that means the submit button on the video url form was clicked. If the url is empty, that means cancel was clicked
        if (url.length > 0) {
          // If the selectedMediaIndex does NOT have a value
          if (this.updatingMediaIndex == null) {
            // Then set the new video
            this.setNewVideo(url);

            // But if the selectedMediaIndex has a value
          } else {
            // Then set the updating of the video
            this.setUpdateVideo(url);
          }
        }

        // Set the focus back to the list
        this.itemList.setFocusToList();

        videoSubscription.unsubscribe();
      });

      // If the media we're adding is an image
    } else {

      // Clear the media select input (This is so the same filename can be re-entered again and again)
      mediaSelectInput.value = '';
      // Open the file explorer window
      mediaSelectInput.click()
    }
  }


  // -----------------------------( SET NEW IMAGE )------------------------------ \\
  setNewImage(event: UIEvent & { target: HTMLInputElement & { files: Array<string> } }) {
    // As long as the file being passed in is NOT null
    if (event.target.files[0] != null) {
      // Let it be known that the adding of media is in progress
      this.addingMediaInProgress = true;
      // Create an empty item at the begining of the list where the new media will be placed
      this.mediaLists[this.indexOfCurrentMediaList].unshift(new MediaItem(this.indexOfCurrentMediaList));


      // Create the form data object and append the image
      let formData = new FormData()
      formData.append('image', event.target.files[0]);
      formData.append('type', this.indexOfCurrentMediaList.toString());


      // Populate the database with the new media
      this.dataService.post('api/Media/Image', formData)
        .subscribe((media: Media) => {
          // Update the empty item with the new media data
          this.itemList.listItems[0].id = media.id;
          this.itemList.listItems[0].url = media.url;
          // this.itemList.listItems[0].thumbnail = media.thumbnail;
          this.onMediaSelect(this.itemList.listItems[0]);

          // Now set the new image to be editable so it can be named
          this.preventNoShow = true;
          this.addingMediaInProgress = false;
          this.itemList.selectedListItemIndex = 0;
          this.itemList.addEventListeners();
          this.itemList.editListItem();
        })
    }
  }


  // -----------------------------( SET UPDATE IMAGE )------------------------------ \\
  setUpdateImage(event: UIEvent & { target: HTMLInputElement & { files: Array<string> } }) {
    // As long as the file being passed in is NOT null
    if (event.target.files[0] != null) {
      // Let it be known that the updating of media is in progress
      this.updatingMediaInProgress = true;

      // Create the form data object and append the image
      let formData = new FormData()
      formData.append('image', event.target.files[0]);
      formData.append('id', this.itemList.listItems[this.updatingMediaIndex].id.toString());

      // Update the current image
      this.dataService.post('api/Media/UpdateImage', formData, 'text').subscribe((url: string) => {
        this.media.url = url;
        this.onMediaSelect(this.itemList.listItems[this.updatingMediaIndex]);
        this.itemList.listItems[this.updatingMediaIndex].url = url;
        this.updatingMediaInProgress = false;
      })
    }
  }


  // --------------------------------( SET NEW VIDEO )-------------------------------- \\
  setNewVideo(url: string) {
    // Let it be known that the adding of media is in progress
    this.addingMediaInProgress = true;
    // Create an empty item at the begining of the list where the new media will be placed
    this.mediaLists[this.indexOfCurrentMediaList].unshift(new MediaItem(this.indexOfCurrentMediaList));


    // Populate the database with the new media
    this.dataService.post('api/Media/Video', { name: url })
      .subscribe((media: Media) => {
        // Update the empty item with the new media data
        this.itemList.listItems[0].id = media.id;
        this.itemList.listItems[0].url = media.url;
        this.itemList.listItems[0].thumbnail = media.thumbnail;
        this.onMediaSelect(this.itemList.listItems[0])

        // Now set the new video to be editable so it can be named
        this.preventNoShow = true;
        this.addingMediaInProgress = false;
        this.itemList.selectedListItemIndex = 0;
        this.itemList.addEventListeners();
        this.itemList.editListItem();
      })
  }


  // --------------------------------( SET UPDATE VIDEO )-------------------------------- \\
  setUpdateVideo(url: string) {
    // Let it be known that the updating of media is in progress
    this.updatingMediaInProgress = true;

    this.dataService.put('api/Media/Video', {
      id: this.itemList.listItems[this.updatingMediaIndex].id,
      name: url
    }).subscribe((media: Media) => {
      this.media.url = media.url;
      this.media.thumbnail = media.thumbnail;
      this.itemList.listItems[this.updatingMediaIndex].url = media.url;
      this.itemList.listItems[this.updatingMediaIndex].thumbnail = media.thumbnail;
      this.onMediaChange.next(this.media);
      this.updatingMediaInProgress = false;
    })
  }


  // -----------------------------( ON MOVE MEDIA )------------------------------ \\
  // onMoveMedia(destinationMedia: MediaType) {
  //   // Let it be known that the moving of media is in progress
  //   this.movingMediaInProgress = true;

  //   let moveMediaItems: Array<MediaItem> = [];


  //   // Prepend the media item to its new list if it is selected
  //   for (let i = 0; i < this.itemList.listItems.length; i++) {
  //     if (this.itemList.listItems[i].selected) moveMediaItems.push(this.itemList.listItems[i]);
  //   }


  //   // Update the database to reflect the move
  //   this.dataService.put('api/Media/Video/Move', {
  //     ids: moveMediaItems.map(x => x.id),
  //     destination: destinationMedia
  //   }).subscribe(() => {
  //     this.movingMediaInProgress = false;

  //     // If the destination list has already been loaded
  //     if (this.mediaLists[destinationMedia].length > 0) {

  //       // Prepend the media item to its new list if it is selected
  //       for (let i = 0; i < this.itemList.listItems.length; i++) {
  //         if (this.itemList.listItems[i].selected) this.mediaLists[destinationMedia].unshift(this.mediaLists[this.indexOfCurrentMediaList][i]);
  //       }
  //     }
  //     // Remove the media item from its original list
  //     this.itemList.deleteListItem();

  //     window.setTimeout(() => {
  //       this.onMediaSelect(this.itemList.listItems[this.itemList.selectedListItemIndex]);
  //     }, 50)
  //   })
  // }


  // -----------------------------( GET URL )------------------------------ \\
  // getUrl(mediaType: MediaType): string {
  //   let url: string;

  //   switch (mediaType) {
  //     case MediaType.Image: {
  //       url = 'api/Images';
  //       break;
  //     }
  //     case MediaType.BackgroundImage: {
  //       url = 'api/BackgroundImages';
  //       break;
  //     }
  //     case MediaType.BannerImage: {
  //       url = 'api/Carousel/Images';
  //       break;
  //     }
  //     case MediaType.CategoryImage: {
  //       url = 'api/Categories/Images';
  //       break;
  //     }
  //     case MediaType.ProductImage: {
  //       url = 'api/Products/Images';
  //       break;
  //     }
  //     case MediaType.Icon: {
  //       url = 'api/ProductContent/Images';
  //       break;
  //     }
  //     case MediaType.Video: {
  //       url = 'api/Videos';
  //       break;
  //     }
  //   }
  //   return url;
  // }


  // --------------------------------( ON POPUP OUT )-------------------------------- \\
  onPopupOut() {
    this.preventNoShow = (this.itemList.promptService.show || this.itemList.indexOfEditedListItem != null || this.addingMediaInProgress || this.updatingMediaInProgress || this.movingMediaInProgress || this.formService.videoUrlForm.show || (this.itemList.selectedListItemIndex != null ? this.itemList.listItems[this.itemList.selectedListItemIndex].loading : null)) ? true : false;
    super.onPopupOut();
  }
}