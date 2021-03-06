import { Component, HostListener, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { DataService } from 'services/data.service';

@Component({
  selector: 'edit-profile-picture',
  templateUrl: './edit-profile-picture.component.html',
  styleUrls: ['./edit-profile-picture.component.scss']
})
export class EditProfilePictureComponent {
  constructor(private dataService: DataService) { }

  // Private
  private scaleValue: number;
  private profilePicBaseWidth: number;
  private profilePicBaseHeight: number;
  private pivot = { x: null, y: null };
  private newPicDimensions = { left: null, top: null, width: null, height: null };

  // Public
  public show: boolean;
  public newImage: Blob;
  public visibility: string;
  public newPicLoaded: boolean;
  public customerImage: string;
  public showDragMessage: boolean;
  public plusButtonDisabled: boolean;
  public minusButtonDisabled: boolean;
  public zoomHandleMoveStartPos: number;
  public picMoveStartPos = { x: null, y: null };
  public circle = { left: null, top: null, bottom: null, right: null, size: null };

  // Decorators
  @ViewChild('zoomBar', { static: false }) zoomBar: ElementRef;
  @ViewChild('picArea', { static: false }) picArea: ElementRef;
  @ViewChild('profilePic', { static: false }) profilePic: ElementRef;
  @ViewChild('zoomHandle', { static: false }) zoomHandle: ElementRef;
  @Output() onProfilePicUpdate: EventEmitter<string> = new EventEmitter();
  @ViewChild('zoomContainer', { static: false }) zoomContainer: ElementRef;
  @ViewChild('circleOverlay', { static: false }) circleOverlay: ElementRef;


  // -----------------------------( ON SHOW )------------------------------ \\
  onShow() {
    this.visibility = "hidden";
    this.showDragMessage = true;

    // When a customer does NOT currently have a profile picutre and they have selected an image for the first time
    if (this.newImage != null) {
      const reader = new FileReader();
      reader.onload = (function (aImg) { return function (e) { aImg.src = e.target.result; }; })(document.getElementById("profilePic") as HTMLImageElement);
      reader.readAsDataURL(this.newImage);

      // When a customer already has a profile picture
    } else {

      let profilePic = document.getElementById("profilePic") as HTMLImageElement;
      profilePic.src = "images\\" + this.customerImage;
    }
  }


  // -----------------------------( ON WINDOW RESIZE )------------------------------ \\
  @HostListener('window:resize')
  onWindowResize() {
    if (this.profilePic != null) {
      this.setProfilePic(this.profilePic.nativeElement);
    }
  }

  // -----------------------------( ON MOUSE MOVE )------------------------------ \\
  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.onMove(e);
  }


  // -----------------------------( ON TOUCH MOVE )------------------------------ \\
  @HostListener('touchmove', ['$event'])
  onTouchMove(e: TouchEvent) {
    this.onMove(e.touches[0]);
  }


  // -----------------------------( ON MOUSE UP )------------------------------ \\
  @HostListener('mouseup')
  onMouseUp() {
    this.picMoveStartPos.x = null;
    this.zoomHandleMoveStartPos = null;
  }


  // -----------------------------( ON TOUCH END )------------------------------ \\
  @HostListener('touchend')
  onTouchEnd() {
    this.picMoveStartPos.x = null;
    this.zoomHandleMoveStartPos = null;
  }


  // -----------------------------( ON PROFILE PIC LOAD )------------------------------ \\
  onProfilePicLoad(e) {
    this.visibility = "visible";
    this.newPicLoaded = true;
    this.scaleValue = 1;
    this.setProfilePic(e.target);
  }


  // -----------------------------( SET PROFILE PIC )------------------------------ \\
  setProfilePic(profilePic) {
    this.minusButtonDisabled = true;
    this.zoomHandle.nativeElement.style.left = "36px";
    this.SetZoomHandleBoundarys();
    let size: number = this.getSize();

    // If the pic's origianl width is larger than its original height
    if (profilePic.naturalWidth > profilePic.naturalHeight) {
      // Get the ratio of width to height
      let ratio = profilePic.naturalWidth / profilePic.naturalHeight;

      // Redefine the dimensions of the pic
      profilePic.style.height = size + "px";
      profilePic.style.width = (size * ratio) + "px";
      profilePic.style.top = ((this.picArea.nativeElement.offsetHeight / 2) - (size / 2)) + "px";
      profilePic.style.left = ((this.picArea.nativeElement.offsetWidth / 2) - (profilePic.offsetWidth / 2)) + "px";

      // But if the pic's origianl height is larger than its original width
    } else {

      // Get the ratio of height to width
      let ratio = profilePic.naturalHeight / profilePic.naturalWidth;

      // Redefine the dimensions of the pic
      profilePic.style.width = size + "px";
      profilePic.style.height = (size * ratio) + "px";
      profilePic.style.left = ((this.picArea.nativeElement.offsetWidth / 2) - (size / 2)) + "px";
      profilePic.style.top = ((this.picArea.nativeElement.offsetHeight / 2) - (profilePic.offsetHeight / 2)) + "px";
    }

    // Set the base width and height for scaling
    this.profilePicBaseWidth = profilePic.offsetWidth;
    this.profilePicBaseHeight = profilePic.offsetHeight;

    // Set the pic scaling starting values
    this.newPicDimensions.left = profilePic.offsetLeft;
    this.newPicDimensions.top = profilePic.offsetTop;
    this.newPicDimensions.width = profilePic.offsetWidth;
    this.newPicDimensions.height = profilePic.offsetHeight;
    this.pivot.x = ((this.picArea.nativeElement.offsetWidth / 2) - this.newPicDimensions.left) / this.newPicDimensions.width;
    this.pivot.y = ((this.picArea.nativeElement.offsetHeight / 2) - this.newPicDimensions.top) / this.newPicDimensions.height;

    // Set the circle overlay size
    this.circleOverlay.nativeElement.style.maxWidth = size + "px";
    this.circleOverlay.nativeElement.style.maxHeight = size + "px";
    this.circleOverlay.nativeElement.style.left = ((this.picArea.nativeElement.offsetWidth / 2) - (this.circleOverlay.nativeElement.offsetWidth / 2)) + "px";
    this.circleOverlay.nativeElement.style.top = ((this.picArea.nativeElement.offsetHeight / 2) - (this.circleOverlay.nativeElement.offsetHeight / 2)) + "px";

    // Set the circle overlay boundarys
    this.circle.left = (this.picArea.nativeElement.offsetWidth / 2) - (this.circleOverlay.nativeElement.offsetWidth / 2);
    this.circle.top = (this.picArea.nativeElement.offsetHeight / 2) - (this.circleOverlay.nativeElement.offsetHeight / 2);
    this.circle.right = this.circle.left + this.circleOverlay.nativeElement.offsetWidth;
    this.circle.bottom = this.circle.top + this.circleOverlay.nativeElement.offsetHeight;
    this.circle.size = this.circleOverlay.nativeElement.offsetWidth;
  }


  // -----------------------------( ON PROFILE PIC MOUSE DOWN )------------------------------ \\
  onProfilePicMouseDown(e) {
    if (this.profilePic.nativeElement.offsetWidth > this.circle.size || this.profilePic.nativeElement.offsetHeight > this.circle.size) {
      this.showDragMessage = false;
      this.picMoveStartPos.x = e.clientX - e.target.getBoundingClientRect().left;
      this.picMoveStartPos.y = e.clientY - e.target.getBoundingClientRect().top;
    }
  }


  // -----------------------------( ON PROFILE PIC TOUCH START )------------------------------ \\
  onProfilePicTouchStart(e) {
    if (this.profilePic.nativeElement.offsetWidth > this.circle.size || this.profilePic.nativeElement.offsetHeight > this.circle.size) {
      this.showDragMessage = false;
      this.picMoveStartPos.x = e.touches[0].clientX - e.target.getBoundingClientRect().left;
      this.picMoveStartPos.y = e.touches[0].clientY - e.target.getBoundingClientRect().top;
    }
  }


  // -----------------------------( ON MOVE )------------------------------ \\
  onMove(e) {
    if (this.picMoveStartPos.x != null) {
      // Move the pic
      this.profilePic.nativeElement.style.left = ((e.clientX - this.picArea.nativeElement.offsetLeft) - this.picMoveStartPos.x) + "px";
      this.profilePic.nativeElement.style.top = ((e.clientY - this.picArea.nativeElement.offsetTop) - this.picMoveStartPos.y) + "px";
      // Set the boundarys
      this.SetProfilePicBoundarys();

      this.newPicDimensions.left = this.profilePic.nativeElement.offsetLeft;
      this.newPicDimensions.top = this.profilePic.nativeElement.offsetTop;
      this.newPicDimensions.width = this.profilePic.nativeElement.offsetWidth;
      this.newPicDimensions.height = this.profilePic.nativeElement.offsetHeight;
      this.pivot.x = ((this.picArea.nativeElement.offsetWidth / 2) - this.newPicDimensions.left) / this.newPicDimensions.width;
      this.pivot.y = ((this.picArea.nativeElement.offsetHeight / 2) - this.newPicDimensions.top) / this.newPicDimensions.height;
    }

    // Move the zoom handle
    if (this.zoomHandleMoveStartPos != null) {
      this.zoomHandle.nativeElement.style.left = ((e.clientX - this.zoomContainer.nativeElement.getBoundingClientRect().left) - this.zoomHandleMoveStartPos) + "px";
      // Set the boundarys
      this.SetZoomHandleBoundarys();
    }
  }


  // -----------------------------( SET PROFILE PIC BOUNDARYS )------------------------------ \\
  SetProfilePicBoundarys() {
    // Left boundary
    if (this.profilePic.nativeElement.offsetLeft > this.circle.left) {
      this.profilePic.nativeElement.style.left = this.circle.left + "px";
    }

    // Right boundary
    if ((this.profilePic.nativeElement.offsetLeft) + this.profilePic.nativeElement.offsetWidth < this.circle.right) {
      this.profilePic.nativeElement.style.left = (-this.profilePic.nativeElement.offsetWidth + this.circle.right) + "px";
    }

    // Top boundary
    if (this.profilePic.nativeElement.offsetTop > this.circle.top) {
      this.profilePic.nativeElement.style.top = this.circle.top + "px";
    }

    // Bottom boundary
    if ((this.profilePic.nativeElement.offsetTop) + this.profilePic.nativeElement.offsetHeight < this.circle.bottom) {
      this.profilePic.nativeElement.style.top = (-this.profilePic.nativeElement.offsetHeight + this.circle.bottom) + "px";
    }
  }


  // -----------------------------( ON ZOOM HANDLE MOUSE DOWN )------------------------------ \\
  onZoomHandleMouseDown(e) {
    this.zoomHandleMoveStartPos = (e.clientX - e.target.getBoundingClientRect().left);
  }


  // -----------------------------( ON ZOOM HANDLE TOUCH START )------------------------------ \\
  onZoomHandleTouchStart(e) {
    this.zoomHandleMoveStartPos = (e.touches[0].clientX - e.target.getBoundingClientRect().left);
  }


  // -----------------------------( ON ZOOM BAR MOUSE DOWN )------------------------------ \\
  onZoomBarMouseDown(e) {
    this.zoomHandle.nativeElement.style.left = (e.clientX - this.zoomContainer.nativeElement.getBoundingClientRect().left - (this.zoomHandle.nativeElement.offsetWidth / 2)) + "px";
    this.zoomHandleMoveStartPos = this.zoomHandle.nativeElement.offsetWidth / 2;
    this.SetZoomHandleBoundarys();
  }


  // -----------------------------( ON MOUSE WHEEL )------------------------------ \\
  onMouseWheel(event: MouseWheelEvent) {
    let wheelDelta = Math.max(-1, Math.min(1, (event.deltaY || -event.detail)));
    let zoomHandleSteppingDistance = this.zoomBar.nativeElement.offsetWidth * 0.075;
    this.zoomHandle.nativeElement.style.left = (this.zoomHandle.nativeElement.offsetLeft + (zoomHandleSteppingDistance * -wheelDelta)) + "px";
    this.SetZoomHandleBoundarys();
  }


  // -----------------------------( SET ZOOM HANDLE BOUNDARYS )------------------------------ \\
  SetZoomHandleBoundarys() {
    // Left boundary
    if (this.zoomHandle.nativeElement.offsetLeft <= this.zoomBar.nativeElement.offsetLeft) {
      this.minusButtonDisabled = true;
      this.zoomHandle.nativeElement.style.left = this.zoomBar.nativeElement.offsetLeft + "px";
    }
    if (this.zoomHandle.nativeElement.offsetLeft > this.zoomBar.nativeElement.offsetLeft) {
      this.minusButtonDisabled = false;
    }

    // Reset the pic scaling starting values
    if (this.zoomHandle.nativeElement.offsetLeft == this.zoomBar.nativeElement.offsetLeft) {
      this.newPicDimensions.left = this.profilePic.nativeElement.offsetLeft;
      this.newPicDimensions.top = this.profilePic.nativeElement.offsetTop;
      this.newPicDimensions.width = this.profilePic.nativeElement.offsetWidth;
      this.newPicDimensions.height = this.profilePic.nativeElement.offsetHeight;
      this.pivot.x = ((this.picArea.nativeElement.offsetWidth / 2) - this.newPicDimensions.left) / this.newPicDimensions.width;
      this.pivot.y = ((this.picArea.nativeElement.offsetHeight / 2) - this.newPicDimensions.top) / this.newPicDimensions.height;
    }

    // Right boundary
    if (this.zoomHandle.nativeElement.offsetLeft + this.zoomHandle.nativeElement.offsetWidth >= this.zoomBar.nativeElement.offsetLeft + this.zoomBar.nativeElement.offsetWidth) {
      this.plusButtonDisabled = true;
      this.zoomHandle.nativeElement.style.left = (this.zoomBar.nativeElement.offsetLeft + this.zoomBar.nativeElement.offsetWidth - this.zoomHandle.nativeElement.offsetWidth) + "px";
    }
    if (this.zoomHandle.nativeElement.offsetLeft + this.zoomHandle.nativeElement.offsetWidth < this.zoomBar.nativeElement.offsetLeft + this.zoomBar.nativeElement.offsetWidth) {
      this.plusButtonDisabled = false;
    }
    this.scaleProfilePic();
  }


  // -----------------------------( ON MINUS BUTTON CLICK )------------------------------ \\
  onMinusButtonClick() {
    if (!this.minusButtonDisabled) {
      let zoomHandleSteppingDistance = this.zoomBar.nativeElement.offsetWidth * 0.075;
      this.zoomHandle.nativeElement.style.left = (this.zoomHandle.nativeElement.offsetLeft - zoomHandleSteppingDistance) + "px";
      this.SetZoomHandleBoundarys();
    }
  }


  // -----------------------------( ON PLUS BUTTON CLICK )------------------------------ \\
  onPlusButtonClick() {
    if (!this.plusButtonDisabled) {
      let zoomHandleSteppingDistance = this.zoomBar.nativeElement.offsetWidth * 0.075;
      this.zoomHandle.nativeElement.style.left = (this.zoomHandle.nativeElement.offsetLeft + zoomHandleSteppingDistance) + "px";
      this.SetZoomHandleBoundarys();
    }
  }


  // -----------------------------( SCALE PROFILE PIC )------------------------------ \\
  scaleProfilePic() {
    let zoomHandleLeft = this.zoomHandle.nativeElement.offsetLeft - 36;
    let zoomBarWidth = 2.3 / (this.zoomBar.nativeElement.offsetWidth - 20);
    this.scaleValue = 1 + (zoomHandleLeft * zoomBarWidth);

    this.profilePic.nativeElement.style.width = (this.profilePicBaseWidth * this.scaleValue) + "px";
    this.profilePic.nativeElement.style.height = (this.profilePicBaseHeight * this.scaleValue) + "px";
    this.profilePic.nativeElement.style.left = (this.newPicDimensions.left - ((this.profilePic.nativeElement.offsetWidth - this.newPicDimensions.width)) * this.pivot.x) + "px";
    this.profilePic.nativeElement.style.top = (this.newPicDimensions.top - ((this.profilePic.nativeElement.offsetHeight - this.newPicDimensions.height)) * this.pivot.y) + "px";

    this.SetProfilePicBoundarys();
  }


  // -----------------------------( GET SIZE )------------------------------ \\
  getSize(): number {
    let size: number;

    // If the height of the pic area is less than its width
    if (this.picArea.nativeElement.offsetHeight < this.picArea.nativeElement.offsetWidth) {
      // And if its height is less than 300
      if (this.picArea.nativeElement.offsetHeight < 300) {
        // Make the size of the circle overlay to be the height of the pic area
        size = this.picArea.nativeElement.offsetHeight;

        // But if the height of the pic area is 300 or more
      } else {
        // Make the size of the circle overlay to be 300
        size = 300;
      }

      // Or if the width of the pic area is less than its height
    } else {

      // And if its width is less than 300
      if (this.picArea.nativeElement.offsetWidth < 300) {
        // Make the size of the circle overlay to be the width of the pic area
        size = this.picArea.nativeElement.offsetWidth;

        // But if the width of the pic area is 300 or more
      } else {
        // Make the size of the circle overlay to be 300
        size = 300;
      }
    }
    return size;
  }


  // -----------------------------( OPEN FILE EXPLORER WINDOW )------------------------------ \\
  OpenFileExplorerWindow(pictureSelectInput: HTMLInputElement) {
    // Clear the picture select input (This is so the same filename can be re-entered again and again)
    pictureSelectInput.value = '';
    // Open the file explorer window
    pictureSelectInput.click();
  }


  // -----------------------------( ON PICTURE SELECT )------------------------------ \\
  onPictureSelect(event: UIEvent & { target: HTMLInputElement & { files: Array<string> } }) {
    this.newPicLoaded = false;
    this.newImage = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (function (aImg) { return function (e) { aImg.src = e.target.result; }; })(document.getElementById("profilePic") as HTMLImageElement);
    reader.readAsDataURL(this.newImage);
  }


  // -----------------------------( ON SAVE BUTTON CLICK )------------------------------ \\
  onSaveButtonClick() {
    let newWidth: number;
    let newHeight: number;

    if (this.profilePic.nativeElement.naturalWidth > this.profilePic.nativeElement.naturalHeight) {
      newWidth = (this.profilePic.nativeElement.naturalWidth / this.profilePic.nativeElement.naturalHeight) * 300;
      newHeight = 300;

    } else {

      newWidth = 300;
      newHeight = (this.profilePic.nativeElement.naturalHeight / this.profilePic.nativeElement.naturalWidth) * 300;
    }


    // If the customer is editing their current profile picture
    if (this.customerImage != null && this.newImage == null) {

      this.dataService.post('api/Account/EditProfilePicture', {
        image: this.customerImage,
        width: Math.round(newWidth * this.scaleValue),
        height: Math.round(newHeight * this.scaleValue),
        cropLeft: Math.round(((newWidth * this.scaleValue) * this.pivot.x) - 150),
        cropTop: Math.round(((newHeight * this.scaleValue) * this.pivot.y) - 150)
      }, 'text').subscribe((editedImage) => {
        this.onProfilePicUpdate.emit(editedImage);
        this.onHide();
      });

      // If the customer is updating their profile picture with a new image
    } else {

      let formData = new FormData()
      formData.append('newImage', this.newImage);
      formData.append('currentImage', this.customerImage == null ? "" : this.customerImage);
      formData.append('width', Math.round(newWidth * this.scaleValue).toString());
      formData.append('height', Math.round(newHeight * this.scaleValue).toString());
      formData.append('cropLeft', Math.round(((newWidth * this.scaleValue) * this.pivot.x) - 150).toString());
      formData.append('cropTop', Math.round(((newHeight * this.scaleValue) * this.pivot.y) - 150).toString());

      // Update the current image
      this.dataService.post('api/Account/NewProfilePicture', formData, 'text').subscribe((newImage) => {
        this.onProfilePicUpdate.emit(newImage);
        this.onHide();
      })
    }
  }


  // -----------------------------( ON HIDE )------------------------------ \\
  onHide() {
    this.show = false;
    this.newImage = null;
    this.customerImage = null;
    this.picMoveStartPos.x = null;
    this.zoomHandleMoveStartPos = null;
  }
}