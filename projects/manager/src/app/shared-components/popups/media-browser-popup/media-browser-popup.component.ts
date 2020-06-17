import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { MediaItem } from '../../../classes/media-item';
import { Observable, of, merge } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ProductMediaType } from '../../../classes/media';

@Component({
  selector: 'media-browser-popup',
  templateUrl: './media-browser-popup.component.html',
  styleUrls: ['./media-browser-popup.component.scss', '../popup/popup.component.scss']
})
export class MediaBrowserPopupComponent extends PopupComponent implements OnInit {
  public mediaType = ProductMediaType;
  public loading: boolean;
  public indexOfSelectedMediaList: number;
  public mediaLists: MediaItem[][] = [[], [], [], [], [], [], []];
  public noMedia: boolean;
  public menuOptions = [
    { add: 'Add Image', edit: 'Edit Image', delete: 'Delete Image', deletes: 'Delete Images' },
    { add: 'Add Background Image', edit: 'Edit Background Image', delete: 'Delete Background Image', deletes: 'Delete Background Images' },
    { add: 'Add Banner Image', edit: 'Edit Banner Image', delete: 'Delete Banner Image', deletes: 'Delete Banner Images' },
    { add: 'Add Category Image', edit: 'Edit Category Image', delete: 'Delete Category Image', deletes: 'Delete Category Images' },
    { add: 'Add Product Image', edit: 'Edit Product Image', delete: 'Delete Product Image', deletes: 'Delete Product Images' },
    { add: 'Add Icon', edit: 'Edit Icon', delete: 'Delete Icon', deletes: 'Delete Icons' },
    { add: 'Add Video', edit: 'Edit Video', delete: 'Delete Video', deletes: 'Delete Videos' },
  ];


  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.popupService.mediaBrowserPopup = this;
  }


  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    super.onPopupShow(popup, arrow);
    this.indexOfSelectedMediaList = ProductMediaType.Image;
    this.noMedia = false;

    if (this.mediaLists[ProductMediaType.Image].length == 0) {
      this.loading = true;


      this.loadMedia().subscribe((mediaItem: MediaItem[]) => {
        this.loading = false;


        if (mediaItem.length == 0) this.noMedia = true;

        this.mediaLists[0] = mediaItem;
      })
    }
  }


  // -----------------------------( ON DROPDOWN CHANGE )------------------------------ \\
  onDropdownChange(optionIndex: number) {
    this.indexOfSelectedMediaList = optionIndex;
    this.noMedia = false;
    if (this.mediaLists[this.indexOfSelectedMediaList].length == 0) {
      this.loading = true;


      this.loadMedia().subscribe((mediaItem: MediaItem[]) => {
        this.loading = false;

        if (mediaItem.length == 0) {
          this.noMedia = true;
        } else {
          this.mediaLists[this.indexOfSelectedMediaList] = mediaItem;
        }
      })
    }
  }


  // -----------------------------( ON GET NEW MEDIA )------------------------------ \\
  onGetNewMedia(event) {
    this.getImage(event.target.files[0]).subscribe((abc: any) => {
      let mediaItem = new MediaItem(abc.id, abc.url, this.indexOfSelectedMediaList);
      this.mediaLists[this.indexOfSelectedMediaList].unshift(mediaItem);
    })
  }




  // ======================================================================= / TEMP \ ====================================================================================== \\
  // ======================================================================= \ DATA / ====================================================================================== \\


  getImage(file): Observable<any> {

    return of({
      id: 'isdfioewioweioweri',
      url: file.name
    }).pipe(delay(1000));
  }






  loadMedia(): Observable<MediaItem[]> {
    if (this.indexOfSelectedMediaList == ProductMediaType.Image) {

      let image1: MediaItem = new MediaItem('oiweoiuwer', '2f119b657c194b32a88b0f0051d525be.png', ProductMediaType.Image); image1.name = image1.image.title = 'Image 1';
      let image2: MediaItem = new MediaItem('qweuywesdo', '6c048ea442b646b59970f907a4d3ce61.jpg', ProductMediaType.Image); image2.name = image2.image.title = 'Image 2';
      let image3: MediaItem = new MediaItem('potyuoptuw', '6e1659b63e5643e0a9039064b4a52e12.png', ProductMediaType.Image); image3.name = image3.image.title = 'Image 3';
      return of([image1, image2, image3]).pipe(delay(1000));
      // return of([])
    }


    if (this.indexOfSelectedMediaList == ProductMediaType.BackgroundImage) {
      let image1: MediaItem = new MediaItem('oiweoiuwer', 'campland-background.jpg', ProductMediaType.BackgroundImage); image1.name = image1.image.title = 'Campland';
      let image2: MediaItem = new MediaItem('qweuywesdo', 'a29f28773e154adaab48a6355f2f4e5d.png', ProductMediaType.BackgroundImage); image2.name = image2.image.title = 'Background Image 2';
      let image3: MediaItem = new MediaItem('potyuoptuw', 'cfb7358d797d484eab24bd2a57d2b850.png', ProductMediaType.BackgroundImage); image3.name = image3.image.title = 'Background Image 3';
      // return of([image1, image2, image3]).pipe(delay(1000));
      return of([])
    }


    if (this.indexOfSelectedMediaList == ProductMediaType.BannerImage) {
      let image1: MediaItem = new MediaItem('oiweoiuwer', 'frozen.jpg', ProductMediaType.BannerImage); image1.name = image1.image.title = 'Frozen';
      let image2: MediaItem = new MediaItem('qweuywesdo', 'a1d9302640ae40a989e9d23e06b5afae.png', ProductMediaType.BannerImage); image2.name = image2.image.title = 'Banner Image 2';
      let image3: MediaItem = new MediaItem('potyuoptuw', '07989637795744629a0e979416b6586d.jpg', ProductMediaType.BannerImage); image3.name = image3.image.title = 'Banner Image 3';
      // return of([image1, image2, image3]).pipe(delay(1000));
      return of([])
    }


    if (this.indexOfSelectedMediaList == ProductMediaType.CategoryImage) {
      let image1: MediaItem = new MediaItem('oiweoiuwer', '44d71fbf43904ffdbdece40a45bdf9db.png', ProductMediaType.CategoryImage); image1.name = image1.image.title = 'Health & Fitness';
      let image2: MediaItem = new MediaItem('qweuywesdo', 'abc61d06435c4a29833a089271fe128a.png', ProductMediaType.CategoryImage); image2.name = image2.image.title = 'Brain Power';
      let image3: MediaItem = new MediaItem('potyuoptuw', 'ab0bda0d51a5408788359471b337662f.png', ProductMediaType.CategoryImage); image3.name = image3.image.title = 'Camping';
      // return of([image1, image2, image3]).pipe(delay(1000));
      return of([])
    }


    if (this.indexOfSelectedMediaList == ProductMediaType.ProductImage) {
      return of([])
    }


    if (this.indexOfSelectedMediaList == ProductMediaType.Icon) {
      let image1: MediaItem = new MediaItem('oiweoiuwer', 'pdf.png', ProductMediaType.Icon); image1.name = image1.image.title = 'PDF';
      let image2: MediaItem = new MediaItem('qweuywesdo', 'audio.png', ProductMediaType.Icon); image2.name = image2.image.title = 'Audio';
      let image3: MediaItem = new MediaItem('potyuoptuw', 'video.png', ProductMediaType.Icon); image3.name = image3.image.title = 'Video';
      let image4: MediaItem = new MediaItem('potyuoptuw', 'software.png', ProductMediaType.Icon); image4.name = image4.image.title = 'Software';
      // return of([image1, image2, image3, image4]).pipe(delay(1000));
      return of([])
    }


    if (this.indexOfSelectedMediaList == ProductMediaType.Video) {
      let image1: MediaItem = new MediaItem('oiweoiuwer', 'thumbnail1.png', ProductMediaType.Video); image1.name = image1.image.title = 'Video 1';
      let image2: MediaItem = new MediaItem('qweuywesdo', 'thumbnail2.png', ProductMediaType.Video); image2.name = image2.image.title = 'Video 2';
      let image3: MediaItem = new MediaItem('potyuoptuw', 'thumbnail3.png', ProductMediaType.Video); image3.name = image3.image.title = 'Video 3';
      let image4: MediaItem = new MediaItem('potyuoptuw', 'thumbnail4.png', ProductMediaType.Video); image4.name = image4.image.title = 'Video 4';
      let image5: MediaItem = new MediaItem('potyuoptuw', 'thumbnail5.png', ProductMediaType.Video); image5.name = image5.image.title = 'Video 5';
      let image6: MediaItem = new MediaItem('potyuoptuw', 'thumbnail6.png', ProductMediaType.Video); image6.name = image6.image.title = 'Video 6';
      // return of([image1, image2, image3, image4, image5, image6]).pipe(delay(1000));
      return of([])
    }
  }
}