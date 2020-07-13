import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { MediaItem } from '../../../classes/media-item';
import { Observable, of, fromEvent, Subscription } from 'rxjs';
import { delay, debounceTime, switchMap, tap } from 'rxjs/operators';
import { MediaType, Media } from '../../../classes/media';
import { MediaItemListComponent } from '../../item-lists/media-item-list/media-item-list.component';
import { DropdownComponent } from '../../elements/dropdowns/dropdown/dropdown.component';
import { PopupService } from '../../../services/popup.service';
import { CoverService } from '../../../services/cover.service';
import { MenuService } from '../../../services/menu.service';
import { ProductService } from '../../../services/product.service';
import { DropdownMenuService } from '../../../services/dropdown-menu.service';
import { KeyValue } from '@angular/common';
import { TempDataService } from '../../../services/temp-data.service';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'media-browser-popup',
  templateUrl: './media-browser-popup.component.html',
  styleUrls: ['../popup/popup.component.scss', './media-browser-popup.component.scss']
})
export class MediaBrowserPopupComponent extends PopupComponent implements OnInit {
  constructor(popupService: PopupService, cover: CoverService, menuService: MenuService, dropdownMenuService: DropdownMenuService, dataService: TempDataService, private productService: ProductService, private formService: FormService) {
    super(popupService, cover, menuService, dropdownMenuService, dataService);
  }
  public media: Media;
  public noMedia: boolean;
  public mediaType = MediaType;
  public updatingMediaIndex: number;
  public addingMediaInProgress: boolean;
  public movingMediaInProgress: boolean;
  public loadingMediaInProgress: boolean;
  public indexOfCurrentMediaList: number;
  public updatingMediaInProgress: boolean;
  public autoSelectedMediaItemIndex: number;
  public dropdownOptions: Array<KeyValue<string, MediaType>>;
  public mediaLists: MediaItem[][] = [[], [], [], [], [], [], [], []];
  private dropdownList: Array<KeyValue<string, MediaType>> = [
    { key: 'Images', value: MediaType.Image },
    { key: 'Background Images', value: MediaType.BackgroundImage },
    { key: 'Banner Images', value: MediaType.BannerImage },
    { key: 'Category Images', value: MediaType.CategoryImage },
    { key: 'Product Images', value: MediaType.ProductImage },
    { key: 'Icons', value: MediaType.Icon },
    { key: 'Videos', value: MediaType.Video }];
  public menuOptions = [
    { add: 'New Image', edit: 'Edit Image Name', update: 'Update Image', delete: 'Delete Image', deletes: 'Delete Images' },
    { add: 'New Background Image', edit: 'Edit Background Image Name', update: 'Update Background Image', delete: 'Delete Background Image', deletes: 'Delete Background Images' },
    { add: 'New Banner Image', edit: 'Edit Banner Image Name', update: 'Update Banner Image', delete: 'Delete Banner Image', deletes: 'Delete Banner Images' },
    { add: 'New Category Image', edit: 'Edit Category Image Name', update: 'Update Category Image', delete: 'Delete Category Image', deletes: 'Delete Category Images' },
    { add: 'New Product Image', edit: 'Edit Product Image Name', update: 'Update Product Image', delete: 'Delete Product Image', deletes: 'Delete Product Images' },
    { add: 'New Icon', edit: 'Edit Icon Name', update: 'Update Icon', delete: 'Delete Icon', deletes: 'Delete Icons' },
    { add: 'New Video', edit: 'Edit Video Name', update: 'Update Video', delete: 'Delete Video', deletes: 'Delete Videos' }, {}
  ];
  @ViewChild('dropdown', { static: false }) dropdown: DropdownComponent;
  @ViewChild('mediaItemList', { static: false }) mediaItemList: MediaItemListComponent;


  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.popupService.mediaBrowserPopup = this;
  }


  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    super.onPopupShow(popup, arrow);
    this.setMediaSearch();
    this.displayMedia(this.popupService.mediaType);
    this.setDropdownOptions();
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
      return this.dataService.get(this.getUrl(this.popupService.mediaType) + '/Search', [{ key: 'searchWords', value: searchInput.value }]);
    }));

    // If a match was found
    searchResults.subscribe((mediaItems: MediaItem[]) => {

      this.indexOfCurrentMediaList = MediaType.Search;
      this.loadingMediaInProgress = false;
      this.mediaLists[this.indexOfCurrentMediaList] = mediaItems;
      // Select the appropriate media item in the list
      this.autoSelectMediaItem();
      this.setDeletePrompt();
    });
  }


  // -----------------------------( SET MEDIA SEARCH MENU OPTIONS )------------------------------ \\
  setMediaSearchMenuOptions() {
    this.menuOptions[7] = {
      add: this.menuOptions[this.popupService.mediaType].add,
      edit: this.menuOptions[this.popupService.mediaType].edit,
      update: this.menuOptions[this.popupService.mediaType].update,
      delete: this.menuOptions[this.popupService.mediaType].delete,
      deletes: this.menuOptions[this.popupService.mediaType].deletes
    };
  }


  // -----------------------------( SET DROPDOWN OPTIONS )------------------------------ \\
  setDropdownOptions() {
    this.dropdownOptions = [];

    if (this.indexOfCurrentMediaList == MediaType.Video) {
      this.dropdownOptions[0] = this.dropdownList[6];
    } else {
      for (let i = 0; i < 6; i++) {
        this.dropdownOptions[i] = this.dropdownList[i];
      }
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
      this.dataService.get(this.getUrl(this.indexOfCurrentMediaList)).subscribe((mediaItems: MediaItem[]) => {
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
          this.setDeletePrompt();
        }
      })

      // If the list has already been loaded from the database
    } else {
      // Select the appropriate media item in the list
      this.autoSelectMediaItem();
      this.setDeletePrompt();
    }
    this.setMediaSearchMenuOptions();
  }


  // -----------------------------( SET DELETE PROMPT )------------------------------ \\
  setDeletePrompt() {
    window.setTimeout(() => {
      // Set delete prompt title and message
      switch (this.popupService.mediaType) {
        case MediaType.Image: {
          this.mediaItemList.promptTitle = 'Delete Image';
          this.mediaItemList.promptMultiTitle = 'Delete Images';
          this.mediaItemList.propmtMessage = 'Are you sure you want to delete the selected image?';
          this.mediaItemList.propmtMultiMessage = 'Are you sure you want to delete all the selected images?';
          break;
        }
        case MediaType.BackgroundImage: {
          this.mediaItemList.promptTitle = 'Delete Background Image';
          this.mediaItemList.promptMultiTitle = 'Delete Background Images';
          this.mediaItemList.propmtMessage = 'Are you sure you want to delete the selected background image?';
          this.mediaItemList.propmtMultiMessage = 'Are you sure you want to delete all the selected background images?';
          break;
        }
        case MediaType.BannerImage: {
          this.mediaItemList.promptTitle = 'Delete Banner Image';
          this.mediaItemList.promptMultiTitle = 'Delete Banner Images';
          this.mediaItemList.propmtMessage = 'Are you sure you want to delete the selected banner image?';
          this.mediaItemList.propmtMultiMessage = 'Are you sure you want to delete all the selected banner images?';
          break;
        }
        case MediaType.CategoryImage: {
          this.mediaItemList.promptTitle = 'Delete Category Image';
          this.mediaItemList.promptMultiTitle = 'Delete Category Images';
          this.mediaItemList.propmtMessage = 'Are you sure you want to delete the selected category image?';
          this.mediaItemList.propmtMultiMessage = 'Are you sure you want to delete all the selected category images?';
          break;
        }
        case MediaType.ProductImage: {
          this.mediaItemList.promptTitle = 'Delete Product Image';
          this.mediaItemList.promptMultiTitle = 'Delete Product Images';
          this.mediaItemList.propmtMessage = 'Are you sure you want to delete the selected product image?';
          this.mediaItemList.propmtMultiMessage = 'Are you sure you want to delete all the selected product images?';
          break;
        }
        case MediaType.Icon: {
          this.mediaItemList.promptTitle = 'Delete Icon';
          this.mediaItemList.promptMultiTitle = 'Delete Icons';
          this.mediaItemList.propmtMessage = 'Are you sure you want to delete the selected icon?';
          this.mediaItemList.propmtMultiMessage = 'Are you sure you want to delete all the selected icons?';
          break;
        }
        case MediaType.Video: {
          this.mediaItemList.promptTitle = 'Delete Video';
          this.mediaItemList.promptMultiTitle = 'Delete Videos';
          this.mediaItemList.propmtMessage = 'Are you sure you want to delete the selected video?';
          this.mediaItemList.propmtMultiMessage = 'Are you sure you want to delete all the selected videos?';
          break;
        }
      }
    });
  }


  // -----------------------------( AUTO SELECT MEDIA ITEM )------------------------------ \\
  autoSelectMediaItem() {
    this.autoSelectedMediaItemIndex = null;
    // If the current media list is videos
    if (this.indexOfCurrentMediaList == MediaType.Video) {

      // Find a match between the target media and a media item in the list using the thumbnail property
      this.autoSelectedMediaItemIndex = this.mediaLists[this.indexOfCurrentMediaList].findIndex(x => x.thumbnail == this.media.thumbnail);

      // When the current media list is everything other than videos
    } else {

      // Find a match between the target media and a media item in the list using the url property
      this.autoSelectedMediaItemIndex = this.mediaLists[this.indexOfCurrentMediaList].findIndex(x => x.url == this.media.url);
    }
  }


  // -----------------------------( ON DROPDOWN CHANGE )------------------------------ \\
  onDropdownChange(mediaType: MediaType, searchInputValue: HTMLInputElement) {
    this.popupService.mediaType = mediaType;
    this.displayMedia(mediaType);
    searchInputValue.value = "";
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

      // Update the media properties with the properties of the selected media item
      this.media.id = mediaItem.id;
      this.media.url = mediaItem.url;
      this.media.type = mediaItem.type;
      this.media.thumbnail = mediaItem.thumbnail;
      this.media.name = mediaItem.name;

      // If the media item that is selected is either a video or a product image
      if (mediaItem.type == MediaType.Video || mediaItem.type == MediaType.ProductImage) {
        this.productService.setCurrentSelectedMedia(this.media);
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
        this.mediaItemList.setFocusToList();

        videoSubscription.unsubscribe();
      });

      // If the media we're adding is an image
    } else {

      // Clear the media select input (This is so the same filename can be entered again and again)
      mediaSelectInput.value = "";
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


      // Populate the database with the new media
      this.dataService.post(this.getUrl(this.popupService.mediaType), event.target.files[0]).subscribe((media: any) => {
        // Update the empty item with the new media data
        this.mediaItemList.listItems[0].id = media.id;
        this.mediaItemList.listItems[0].url = media.url;
        // this.mediaItemList.listItems[0].thumbnail = media.thumbnail;
        this.onMediaSelect(this.mediaItemList.listItems[0]);

        // Now set the new image to be editable so it can be named
        this.preventNoShow = true;
        this.addingMediaInProgress = false;
        this.mediaItemList.selectedListItemIndex = 0;
        this.mediaItemList.addEventListeners();
        this.mediaItemList.editListItem();
      })
    }
  }


  // -----------------------------( SET UPDATE IMAGE )------------------------------ \\
  setUpdateImage(event: UIEvent & { target: HTMLInputElement & { files: Array<string> } }) {
    // As long as the file being passed in is NOT null
    if (event.target.files[0] != null) {
      // Let it be known that the updating of media is in progress
      this.updatingMediaInProgress = true;

      this.dataService.put(this.getUrl(this.popupService.mediaType), {
        id: this.mediaItemList.listItems[this.updatingMediaIndex].id,
        image: event.target.files[0]
      }).subscribe(() => {
        this.onMediaSelect(this.mediaItemList.listItems[this.updatingMediaIndex]);
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
    this.dataService.post(this.getUrl(this.popupService.mediaType), url).subscribe((media: any) => {
      // Update the empty item with the new media data
      this.mediaItemList.listItems[0].id = media.id;
      this.mediaItemList.listItems[0].url = media.url;
      this.mediaItemList.listItems[0].thumbnail = media.thumbnail;
      this.onMediaSelect(this.mediaItemList.listItems[0])

      // Now set the new video to be editable so it can be named
      this.preventNoShow = true;
      this.addingMediaInProgress = false;
      this.mediaItemList.selectedListItemIndex = 0;
      this.mediaItemList.addEventListeners();
      this.mediaItemList.editListItem();
    })
  }


  // --------------------------------( SET UPDATE VIDEO )-------------------------------- \\
  setUpdateVideo(url: string) {
    // Let it be known that the updating of media is in progress
    this.updatingMediaInProgress = true;

    this.dataService.put(this.getUrl(this.popupService.mediaType), {
      id: this.mediaItemList.listItems[this.updatingMediaIndex].id,
      url: url
    }).subscribe((media: any) => {
      this.mediaItemList.listItems[this.updatingMediaIndex].url = media.url;
      this.mediaItemList.listItems[this.updatingMediaIndex].thumbnail = media.thumbnail;
      this.onMediaSelect(this.mediaItemList.listItems[this.updatingMediaIndex])
      this.updatingMediaInProgress = false;
    })
  }


  // -----------------------------( ON MOVE MEDIA )------------------------------ \\
  onMoveMedia(destinationMedia: MediaType) {
    // Let it be known that the moving of media is in progress
    this.movingMediaInProgress = true;

    let moveMediaItems: Array<MediaItem> = [];


    // Prepend the media item to its new list if it is selected
    for (let i = 0; i < this.mediaItemList.listItems.length; i++) {
      if (this.mediaItemList.listItems[i].selected) moveMediaItems.push(this.mediaItemList.listItems[i]);
    }


    // Update the database to reflect the move
    this.dataService.put(this.getUrl(this.popupService.mediaType) + "/Move", {
      ids: moveMediaItems.map(x => x.id),
      destination: destinationMedia
    }).subscribe(() => {
      this.movingMediaInProgress = false;

      // If the destination list has already been loaded
      if (this.mediaLists[destinationMedia].length > 0) {

        // Prepend the media item to its new list if it is selected
        for (let i = 0; i < this.mediaItemList.listItems.length; i++) {
          if (this.mediaItemList.listItems[i].selected) this.mediaLists[destinationMedia].unshift(this.mediaLists[this.indexOfCurrentMediaList][i]);
        }
      }
      // Remove the media item from its original list
      this.mediaItemList.deleteListItem();
    })
  }


  // -----------------------------( GET URL )------------------------------ \\
  getUrl(mediaType: MediaType): string {
    let url: string;

    switch (mediaType) {
      case MediaType.Image: {
        url = 'api/Images';
        break;
      }
      case MediaType.BackgroundImage: {
        url = 'api/BackgroundImages';
        break;
      }
      case MediaType.BannerImage: {
        url = 'api/Carousel/Images';
        break;
      }
      case MediaType.CategoryImage: {
        url = 'api/Categories/Images';
        break;
      }
      case MediaType.ProductImage: {
        url = 'api/Products/Images';
        break;
      }
      case MediaType.Icon: {
        url = 'api/ProductContent/Images';
        break;
      }
      case MediaType.Video: {
        url = 'api/Videos';
        break;
      }
    }
    return url;
  }


  // -----------------------------( UPDATE MEDIA NAME )------------------------------ \\
  updateMediaName(mediaItem: MediaItem) {
    mediaItem.loading = true;
    this.dataService.put(

      this.getUrl(this.popupService.mediaType), mediaItem)
      .subscribe((id: string) => {
        mediaItem.loading = false;
        mediaItem.id = id;
      });
  }


  // --------------------------------( ON POPUP OUT )-------------------------------- \\
  onPopupOut() {
    this.preventNoShow = (this.mediaItemList.promptService.show || this.mediaItemList.indexOfEditedListItem != null || this.addingMediaInProgress || this.updatingMediaInProgress || this.movingMediaInProgress || this.formService.videoUrlForm.show || (this.mediaItemList.selectedListItemIndex != null ? this.mediaItemList.listItems[this.mediaItemList.selectedListItemIndex].loading : null)) ? true : false;
    super.onPopupOut();
  }
}