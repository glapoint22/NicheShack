import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { MediaItem } from '../../../classes/media-item';
import { Observable, of, fromEvent } from 'rxjs';
import { delay, debounceTime, switchMap, tap } from 'rxjs/operators';
import { MediaType, Media } from '../../../classes/media';
import { MediaItemListComponent } from '../../item-lists/media-item-list/media-item-list.component';
import { Image } from '../../../classes/image';
import { DropdownComponent } from '../../elements/dropdowns/dropdown/dropdown.component';
import { PopupService } from '../../../services/popup.service';
import { CoverService } from '../../../services/cover.service';
import { MenuService } from '../../../services/menu.service';
import { ProductService } from '../../../services/product.service';
import { DropdownMenuService } from '../../../services/dropdown-menu.service';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'media-browser-popup',
  templateUrl: './media-browser-popup.component.html',
  styleUrls: ['../popup/popup.component.scss', './media-browser-popup.component.scss']
})
export class MediaBrowserPopupComponent extends PopupComponent implements OnInit {
  constructor(popupService: PopupService, cover: CoverService, menuService: MenuService, dropdownMenuService: DropdownMenuService, private productService: ProductService) {
    super(popupService, cover, menuService, dropdownMenuService);
  }
  public searchInput: HTMLInputElement;
  public media: Media;
  public noMedia: boolean;
  public mediaType = MediaType;
  public addingMediaInProgress: boolean;
  public movingMediaInProgress: boolean;
  public autoSelectedMediaItemIndex: number;
  public loadingMediaInProgress: boolean;
  public indexOfCurrentMediaList: number;
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
    { add: 'Add Image', edit: 'Edit Image', delete: 'Delete Image', deletes: 'Delete Images' },
    { add: 'Add Background Image', edit: 'Edit Background Image', delete: 'Delete Background Image', deletes: 'Delete Background Images' },
    { add: 'Add Banner Image', edit: 'Edit Banner Image', delete: 'Delete Banner Image', deletes: 'Delete Banner Images' },
    { add: 'Add Category Image', edit: 'Edit Category Image', delete: 'Delete Category Image', deletes: 'Delete Category Images' },
    { add: 'Add Product Image', edit: 'Edit Product Image', delete: 'Delete Product Image', deletes: 'Delete Product Images' },
    { add: 'Add Icon', edit: 'Edit Icon', delete: 'Delete Icon', deletes: 'Delete Icons' },
    { add: 'Add Video', edit: 'Edit Video', delete: 'Delete Video', deletes: 'Delete Videos' }, {}
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
    this.setDropdownOptions();
    this.displayMedia(this.popupService.mediaType);
  }


  // -----------------------------( SET MEDIA SEARCH )------------------------------ \\
  setMediaSearch() {
    let searchInput = document.getElementById('search-input') as HTMLInputElement;
    let onInputChange = fromEvent(searchInput, 'input');
    let searchResults = onInputChange.pipe(debounceTime(250), switchMap(() => {
      if (searchInput.value == '') {
        this.loadingMediaInProgress = false;
        this.indexOfCurrentMediaList = this.popupService.mediaType;
        // Select the appropriate media item in the list
        this.autoSelectMediaItem();
        return of();
      }
      this.loadingMediaInProgress = true;
      return this.searchMedia();
    }));
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
    let searchType: Array<string> = [];
    this.menuOptions[7] = {
      add: 'Add ' + searchType[this.indexOfCurrentMediaList],
      edit: 'Edit ' + searchType[this.indexOfCurrentMediaList],
      delete: 'Delete ' + searchType[this.indexOfCurrentMediaList],
      deletes: 'Delete ' + searchType[this.indexOfCurrentMediaList] + 's'
    };
  }


  // -----------------------------( SET DROPDOWN OPTIONS )------------------------------ \\
  setDropdownOptions() {
    this.dropdownOptions = [];

    if (this.popupService.mediaType == MediaType.Video) {
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
      this.loadMedia().subscribe((mediaItems: MediaItem[]) => {
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
    // If the media item being passed in no longer resides in the current list
    if (mediaItem == null) {

      // If the current media is video
      if (mediaItem.type == MediaType.Video) {
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


  // -----------------------------( ON ADD MEDIA )------------------------------ \\
  onAddMedia(mediaSelectInput: HTMLElement) {
    if (this.indexOfCurrentMediaList == MediaType.Video) {

    } else {
      mediaSelectInput.click()
    }
  }


  // -----------------------------( SET NEW MEDIA )------------------------------ \\
  setNewMedia(event) {
    // Let it be known that the adding of media is in progress
    this.addingMediaInProgress = true;
    // Create an empty item at the begining of the list where the new media will be placed
    this.mediaLists[this.indexOfCurrentMediaList].unshift(new MediaItem(this.indexOfCurrentMediaList));

    // Populate the database with the new media
    this.getNewMedia(event.target.files[0]).subscribe((media: any) => {
      // Update the empty item with the new media data
      this.mediaItemList.listItems[0].id = media.id;
      this.mediaItemList.listItems[0].url = media.url;

      // Now set the new media to be editable so it can be named
      this.preventNoShow = true;
      this.addingMediaInProgress = false;
      this.mediaItemList.selectedListItemIndex = 0;
      this.mediaItemList.addEventListeners();
      this.mediaItemList.setListItemEdit();
    })
  }


  // -----------------------------( ON MOVE MEDIA )------------------------------ \\
  onMoveMedia(destinationMedia: MediaType) {
    // Let it be known that the moving of media is in progress
    this.movingMediaInProgress = true;

    // Update the database to reflect the move
    this.moveMedia().subscribe(() => {
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


  // --------------------------------( ON POPUP OUT )-------------------------------- \\
  onPopupOut() {
    this.preventNoShow = (this.mediaItemList.indexOfEditedListItem != null || this.addingMediaInProgress || this.movingMediaInProgress) ? true : false;
    super.onPopupOut();
  }




  // ======================================================================= / TEMP \ ====================================================================================== \\
  // ======================================================================= \ DATA / ====================================================================================== \\


  // --------------------------------( LOAD MEDIA )-------------------------------- \\
  loadMedia(): Observable<MediaItem[]> {
    if (this.indexOfCurrentMediaList == MediaType.Image) {
      let image1: MediaItem = new MediaItem(MediaType.Image); image1.name = 'Image 1'; image1.id = 'oiweoiuwer'; image1.url = '2f119b657c194b32a88b0f0051d525be.png';
      let image2: MediaItem = new MediaItem(MediaType.Image); image2.name = 'Image 2'; image2.id = 'qweuywesdo'; image2.url = '6c048ea442b646b59970f907a4d3ce61.jpg';
      let image3: MediaItem = new MediaItem(MediaType.Image); image3.name = 'Image 3'; image3.id = 'potyuoptuw'; image3.url = '0aada12f8b21471ea96aebe9a503977b.png';
      let image4: MediaItem = new MediaItem(MediaType.Image); image4.name = 'Image 4'; image4.id = 'potyuoptuw'; image4.url = '6e1659b63e5643e0a9039064b4a52e12.png';
      return of([image1, image2, image3, image4]).pipe(delay(1000));
    }


    if (this.indexOfCurrentMediaList == MediaType.BackgroundImage) {
      let image1: MediaItem = new MediaItem(MediaType.BackgroundImage); image1.name = 'Campland'; image1.id = 'oiweoiuwer'; image1.url = 'campland-background.jpg';
      let image2: MediaItem = new MediaItem(MediaType.BackgroundImage); image2.name = 'Background Image 2'; image2.id = 'qweuywesdo'; image2.url = 'a29f28773e154adaab48a6355f2f4e5d.png';
      let image3: MediaItem = new MediaItem(MediaType.BackgroundImage); image3.name = 'Background Image 3'; image3.id = 'potyuoptuw'; image3.url = 'cfb7358d797d484eab24bd2a57d2b850.png';
      return of([image1, image2, image3]).pipe(delay(1000));
    }


    if (this.indexOfCurrentMediaList == MediaType.BannerImage) {
      let image1: MediaItem = new MediaItem(MediaType.BannerImage); image1.name = 'Frozen'; image1.id = 'oiweoiuwer'; image1.url = 'frozen.jpg';
      let image2: MediaItem = new MediaItem(MediaType.BannerImage); image2.name = 'Banner Image 1'; image2.id = 'qweuywesdo'; image2.url = 'banner1.jpg';
      let image3: MediaItem = new MediaItem(MediaType.BannerImage); image3.name = 'Banner Image 2'; image3.id = 'potyuoptuw'; image3.url = 'banner2.jpg';
      let image4: MediaItem = new MediaItem(MediaType.BannerImage); image4.name = 'Banner Image 3'; image4.id = 'qweuywesdo'; image4.url = 'banner3.jpg';
      let image5: MediaItem = new MediaItem(MediaType.BannerImage); image5.name = 'Banner Image 4'; image5.id = 'potyuoptuw'; image5.url = 'banner4.jpg';
      let image6: MediaItem = new MediaItem(MediaType.BannerImage); image6.name = 'Banner Image 5'; image6.id = 'qweuywesdo'; image6.url = 'banner5.jpg';
      return of([image1, image2, image3, image4, image5, image6]).pipe(delay(1000));
    }


    if (this.indexOfCurrentMediaList == MediaType.CategoryImage) {
      let image1: MediaItem = new MediaItem(MediaType.CategoryImage); image1.name = 'Health & Fitness'; image1.id = 'oiweoiuwer'; image1.url = '44d71fbf43904ffdbdece40a45bdf9db.png';
      let image2: MediaItem = new MediaItem(MediaType.CategoryImage); image2.name = 'Brain Power'; image2.id = 'qweuywesdo'; image2.url = 'abc61d06435c4a29833a089271fe128a.png';
      let image3: MediaItem = new MediaItem(MediaType.CategoryImage); image3.name = 'Camping'; image3.id = 'potyuoptuw'; image3.url = 'ab0bda0d51a5408788359471b337662f.png';
      return of([image1, image2, image3]).pipe(delay(1000));
    }


    if (this.indexOfCurrentMediaList == MediaType.ProductImage) {
      let image1: MediaItem = new MediaItem(MediaType.ProductImage); image1.name = 'How to Seduce Out of Your League'; image1.id = 'oiweoiuwer'; image1.url = 'b4fa43f207d7420cbb2c72d0fe9c64ba.jpg';
      let image2: MediaItem = new MediaItem(MediaType.ProductImage); image2.name = 'The 21 Day Flat Belly Fix System'; image2.id = 'qweuywesdo'; image2.url = '899c7b6deb544dd28a7ec3055c5196a1.jpg';
      let image3: MediaItem = new MediaItem(MediaType.ProductImage); image3.name = 'Bigger Better Butt              '; image3.id = 'potyuoptuw'; image3.url = 'b212b69728ee4f3b9473831bb4f7ace9.png';
      return of([image1, image2, image3]).pipe(delay(1000));
    }


    if (this.indexOfCurrentMediaList == MediaType.Icon) {
      let image1: MediaItem = new MediaItem(MediaType.Icon); image1.name = 'PDF'; image1.id = 'oiweoiuwer'; image1.url = 'pdf.png';
      let image2: MediaItem = new MediaItem(MediaType.Icon); image2.name = 'Audio'; image2.id = 'qweuywesdo'; image2.url = 'audio.png';
      let image3: MediaItem = new MediaItem(MediaType.Icon); image3.name = 'Video'; image3.id = 'potyuoptuw'; image3.url = 'video.png';
      let image4: MediaItem = new MediaItem(MediaType.Icon); image4.name = 'Software'; image4.id = 'potyuoptuw'; image4.url = 'software.png';
      return of([image1, image2, image3, image4]).pipe(delay(1000));
    }


    if (this.indexOfCurrentMediaList == MediaType.Video) {
      let image1: MediaItem = new MediaItem(MediaType.Video); image1.name = 'Video 1'; image1.id = 'oiweoiuwer'; image1.thumbnail = 'thumbnail1.png'; image1.url = '//player.vimeo.com/video/173192945?title=0&byline=0&portrait=0&color=ffffff';
      let image2: MediaItem = new MediaItem(MediaType.Video); image2.name = 'Video 2'; image2.id = 'qweuywesdo'; image2.thumbnail = 'thumbnail2.png'; image2.url = 'https://www.youtube.com/embed/1AI6RS1st2E';
      let image3: MediaItem = new MediaItem(MediaType.Video); image3.name = 'Video 3'; image3.id = 'potyuoptuw'; image3.thumbnail = 'thumbnail3.png'; image3.url = '//player.vimeo.com/video/179479722?title=0&byline=0&portrait=0&color=ffffff';
      let image4: MediaItem = new MediaItem(MediaType.Video); image4.name = 'Video 4'; image4.id = 'oiweoiuwer'; image4.thumbnail = 'thumbnail4.png'; image4.url = 'https://www.youtube.com/embed/3ZEu6ZOMhlw';
      let image5: MediaItem = new MediaItem(MediaType.Video); image5.name = 'Video 5'; image5.id = 'qweuywesdo'; image5.thumbnail = 'thumbnail5.png'; image5.url = 'https://player.vimeo.com/video/218732620';
      let image6: MediaItem = new MediaItem(MediaType.Video); image6.name = 'Video 6'; image6.id = 'potyuoptuw'; image6.thumbnail = 'thumbnail6.png'; image6.url = 'https://player.vimeo.com/video/264188894';
      return of([image1, image2, image3, image4, image5, image6]).pipe(delay(1000));
    }
  }


  // --------------------------------( SEARCH MEDIA )-------------------------------- \\
  searchMedia(): Observable<MediaItem[]> {
    let image1: MediaItem = new MediaItem(this.popupService.mediaType); image1.name = 'Gumpy Ice Cream secrets'; image1.id = 'oiweoiuwer'; image1.url = '1f3eccf21332491c949c7ac1648945ec.jpg';
    let image2: MediaItem = new MediaItem(this.popupService.mediaType); image2.name = 'A Gumpy a day keeps the doctor away'; image2.id = 'qweuywesdo'; image2.url = '2c35cff4d5d04327af35e26f9f7ebe79.png';
    let image3: MediaItem = new MediaItem(this.popupService.mediaType); image3.name = 'Gumpy Honey Ice Cream'; image3.id = 'potyuoptuw'; image3.url = '9da5043dd53a45efb472269b2d283dac.png';
    return of([image1, image2, image3]).pipe(delay(1000));
  }


  // --------------------------------( GET NEW MEDIA )-------------------------------- \\
  getNewMedia(file): Observable<any> {
    return of({
      id: 'isdfioewioweioweri',
      url: file.name
    }).pipe(delay(3000));
  }


  // --------------------------------( MOVE MEDIA )-------------------------------- \\
  moveMedia(): Observable<any> {
    return of({

    }).pipe(delay(3000));
  }
}