import { Component, OnInit, ViewChild } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { MediaItem } from '../../../classes/media-item';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MediaType, Media } from '../../../classes/media';
import { MediaItemListComponent } from '../../item-lists/media-item-list/media-item-list.component';
import { Image } from '../../../classes/image';
import { DropdownComponent } from '../../elements/dropdowns/dropdown/dropdown.component';
import { PopupService } from '../../../services/popup.service';
import { CoverService } from '../../../services/cover.service';
import { MenuService } from '../../../services/menu.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'media-browser-popup',
  templateUrl: './media-browser-popup.component.html',
  styleUrls: ['../popup/popup.component.scss', './media-browser-popup.component.scss']
})
export class MediaBrowserPopupComponent extends PopupComponent implements OnInit {

  constructor(popupService: PopupService, cover: CoverService, menuService: MenuService, private productService: ProductService) {
    super(popupService, cover, menuService);
   }



  public image: Image;
  public media: Media;
  public noMedia: boolean;
  public mediaType = MediaType;
  public addingMediaInProgress: boolean;
  public movingMediaInProgress: boolean;
  public loadingMediaInProgress: boolean;
  public indexOfSelectedMediaList: number;
  public mediaLists: MediaItem[][] = [[], [], [], [], [], [], []];
  public menuOptions = [
    { add: 'Add Image', edit: 'Edit Image', delete: 'Delete Image', deletes: 'Delete Images' },
    { add: 'Add Background Image', edit: 'Edit Background Image', delete: 'Delete Background Image', deletes: 'Delete Background Images' },
    { add: 'Add Banner Image', edit: 'Edit Banner Image', delete: 'Delete Banner Image', deletes: 'Delete Banner Images' },
    { add: 'Add Category Image', edit: 'Edit Category Image', delete: 'Delete Category Image', deletes: 'Delete Category Images' },
    { add: 'Add Product Image', edit: 'Edit Product Image', delete: 'Delete Product Image', deletes: 'Delete Product Images' },
    { add: 'Add Icon', edit: 'Edit Icon', delete: 'Delete Icon', deletes: 'Delete Icons' },
    { add: 'Add Video', edit: 'Edit Video', delete: 'Delete Video', deletes: 'Delete Videos' },
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
    this.displayMedia(this.popupService.mediaType);
  }


  // -----------------------------( ON DROPDOWN CHANGE )------------------------------ \\
  onDropdownChange(mediaType: MediaType) {
    this.displayMedia(mediaType);
  }


  // -----------------------------( DISPLAY MEDIA )------------------------------ \\
  displayMedia(mediaType: MediaType) {
    this.noMedia = false;
    this.indexOfSelectedMediaList = mediaType;

    // If the list has NOT been loaded from the database yet
    if (this.mediaLists[this.indexOfSelectedMediaList].length == 0) {
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
          this.mediaLists[this.indexOfSelectedMediaList] = mediaItems;
        }
      })
    }
  }


  // -----------------------------( ON GET NEW MEDIA )------------------------------ \\
  onGetNewMedia(event) {
    // Let it be known that the adding of media is in progress
    this.addingMediaInProgress = true;
    // Create an empty item at the begining of the list where the new media will be placed
    this.mediaLists[this.indexOfSelectedMediaList].unshift(new MediaItem('', '', this.indexOfSelectedMediaList));

    // Populate the database with the new media
    this.getNewMedia(event.target.files[0]).subscribe((media: any) => {
      // Update the empty item with the new media data
      this.mediaItemList.listItems[0].id = media.id;
      this.mediaItemList.listItems[0].image.url = media.url;

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
        // Prepend the media item to its new list
        this.mediaLists[destinationMedia].unshift(this.mediaLists[this.indexOfSelectedMediaList][this.mediaItemList.selectedListItemIndex]);
      }
      // Remove the media item from its original list
      this.mediaItemList.deleteListItem();
    })
  }


  onMediaSelect(mediaItem: MediaItem) {

    if(mediaItem.type == MediaType.Video || mediaItem.type == MediaType.ProductImage) {
      this.media.url = mediaItem.videoUrl;
      this.media.type = mediaItem.type;
      this.media.image.url = mediaItem.image.url;
      this.media.image.title = mediaItem.image.title;
      this.productService.setCurrentSelectedMedia(this.media);
    }else {
      this.image.url = mediaItem.image.url;
      this.image.title = mediaItem.image.title;
    }
  }


  // --------------------------------( ON POPUP OUT )-------------------------------- \\
  onPopupOut() {
    this.preventNoShow = (this.mediaItemList.indexOfEditedListItem != null || this.addingMediaInProgress) ? true : false;
    super.onPopupOut();
  }




  // ======================================================================= / TEMP \ ====================================================================================== \\
  // ======================================================================= \ DATA / ====================================================================================== \\






  // --------------------------------( LOAD MEDIA )-------------------------------- \\
  loadMedia(): Observable<MediaItem[]> {
    if (this.indexOfSelectedMediaList == MediaType.Image) {
      let image1: MediaItem = new MediaItem('oiweoiuwer', '2f119b657c194b32a88b0f0051d525be.png', MediaType.Image); image1.name = image1.image.title = 'Image 1'; 
      let image2: MediaItem = new MediaItem('qweuywesdo', '6c048ea442b646b59970f907a4d3ce61.jpg', MediaType.Image); image2.name = image2.image.title = 'Image 2'; 
      let image3: MediaItem = new MediaItem('potyuoptuw', '6e1659b63e5643e0a9039064b4a52e12.png', MediaType.Image); image3.name = image3.image.title = 'Image 3'; 
      return of([image1, image2, image3]).pipe(delay(1000));
    }


    if (this.indexOfSelectedMediaList == MediaType.BackgroundImage) {
      let image1: MediaItem = new MediaItem('oiweoiuwer', 'campland-background.jpg', MediaType.BackgroundImage); image1.name = image1.image.title = 'Campland'; 
      let image2: MediaItem = new MediaItem('qweuywesdo', 'a29f28773e154adaab48a6355f2f4e5d.png', MediaType.BackgroundImage); image2.name = image2.image.title = 'Background Image 2'; 
      let image3: MediaItem = new MediaItem('potyuoptuw', 'cfb7358d797d484eab24bd2a57d2b850.png', MediaType.BackgroundImage); image3.name = image3.image.title = 'Background Image 3'; 
      return of([image1, image2, image3]).pipe(delay(1000));
    }


    if (this.indexOfSelectedMediaList == MediaType.BannerImage) {
      let image1: MediaItem = new MediaItem('oiweoiuwer', 'frozen.jpg', MediaType.BannerImage); image1.name = image1.image.title = 'Frozen';
      let image2: MediaItem = new MediaItem('qweuywesdo', 'a1d9302640ae40a989e9d23e06b5afae.png', MediaType.BannerImage); image2.name = image2.image.title = 'Banner Image 2';
      let image3: MediaItem = new MediaItem('potyuoptuw', '07989637795744629a0e979416b6586d.jpg', MediaType.BannerImage); image3.name = image3.image.title = 'Banner Image 3';
      return of([image1, image2, image3]).pipe(delay(1000));
    }


    if (this.indexOfSelectedMediaList == MediaType.CategoryImage) {
      let image1: MediaItem = new MediaItem('oiweoiuwer', '44d71fbf43904ffdbdece40a45bdf9db.png', MediaType.CategoryImage); image1.name = image1.image.title = 'Health & Fitness';
      let image2: MediaItem = new MediaItem('qweuywesdo', 'abc61d06435c4a29833a089271fe128a.png', MediaType.CategoryImage); image2.name = image2.image.title = 'Brain Power';
      let image3: MediaItem = new MediaItem('potyuoptuw', 'ab0bda0d51a5408788359471b337662f.png', MediaType.CategoryImage); image3.name = image3.image.title = 'Camping';
      return of([image1, image2, image3]).pipe(delay(1000));
    }


    if (this.indexOfSelectedMediaList == MediaType.ProductImage) {
      let image1: MediaItem = new MediaItem('oiweoiuwer', 'b4fa43f207d7420cbb2c72d0fe9c64ba.jpg', MediaType.ProductImage); image1.name = image1.image.title = 'How to Seduce Out of Your League';
      let image2: MediaItem = new MediaItem('qweuywesdo', '899c7b6deb544dd28a7ec3055c5196a1.jpg', MediaType.ProductImage); image2.name = image2.image.title = 'The 21 Day Flat Belly Fix System';
      let image3: MediaItem = new MediaItem('potyuoptuw', 'b212b69728ee4f3b9473831bb4f7ace9.png', MediaType.ProductImage); image3.name = image3.image.title = 'Bigger Better Butt';
      return of([image1, image2, image3]).pipe(delay(1000));
    }


    if (this.indexOfSelectedMediaList == MediaType.Icon) {
      let image1: MediaItem = new MediaItem('oiweoiuwer', 'pdf.png', MediaType.Icon); image1.name = image1.image.title = 'PDF';
      let image2: MediaItem = new MediaItem('qweuywesdo', 'audio.png', MediaType.Icon); image2.name = image2.image.title = 'Audio';
      let image3: MediaItem = new MediaItem('potyuoptuw', 'video.png', MediaType.Icon); image3.name = image3.image.title = 'Video';
      let image4: MediaItem = new MediaItem('potyuoptuw', 'software.png', MediaType.Icon); image4.name = image4.image.title = 'Software';
      return of([image1, image2, image3, image4]).pipe(delay(1000));
    }


    if (this.indexOfSelectedMediaList == MediaType.Video) {
      let image1: MediaItem = new MediaItem('oiweoiuwer', 'thumbnail1.png', MediaType.Video); image1.name = image1.image.title = 'Video 1'; image1.videoUrl = '//player.vimeo.com/video/173192945?title=0&byline=0&portrait=0&color=ffffff';
      let image2: MediaItem = new MediaItem('qweuywesdo', 'thumbnail2.png', MediaType.Video); image2.name = image2.image.title = 'Video 2'; image2.videoUrl = 'https://www.youtube.com/embed/1AI6RS1st2E';
      let image3: MediaItem = new MediaItem('potyuoptuw', 'thumbnail3.png', MediaType.Video); image3.name = image3.image.title = 'Video 3'; image3.videoUrl = '//player.vimeo.com/video/179479722?title=0&byline=0&portrait=0&color=ffffff';
      let image4: MediaItem = new MediaItem('potyuoptuw', 'thumbnail4.png', MediaType.Video); image4.name = image4.image.title = 'Video 4'; image4.videoUrl = 'https://www.youtube.com/embed/3ZEu6ZOMhlw';
      let image5: MediaItem = new MediaItem('potyuoptuw', 'thumbnail5.png', MediaType.Video); image5.name = image5.image.title = 'Video 5'; image5.videoUrl = 'https://player.vimeo.com/video/218732620';
      let image6: MediaItem = new MediaItem('potyuoptuw', 'thumbnail6.png', MediaType.Video); image6.name = image6.image.title = 'Video 6'; image6.videoUrl = 'https://player.vimeo.com/video/264188894';
      return of([image1, image2, image3, image4, image5, image6]).pipe(delay(1000));
    }
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