import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'services/data.service';

@Component({
  selector: 'edit-profile-picture',
  templateUrl: './edit-profile-picture.component.html',
  styleUrls: ['./edit-profile-picture.component.scss']
})
export class EditProfilePictureComponent {
  constructor(private dataService: DataService) { }
  public show: boolean;
  public picUrl;
  public picMoveStartPos = { x: null, y: null };
  public zoomHandleMoveStartPos: number;
  public minusButtonDisabled: boolean;
  public plusButtonDisabled: boolean;
  public showDragMessage: boolean;
  public isLandcscape: boolean;

  private scaleValue: number;
  private profilePicBaseWidth: number;
  private profilePicBaseHeight: number;
  private pivot = { x: null, y: null };
  private circleOverlay = { left: null, top: null, bottom: null, right: null };
  private newPicDimensions = { left: null, top: null, width: null, height: null };

  @ViewChild('zoomBar', { static: false }) zoomBar: ElementRef;
  @ViewChild('picArea', { static: false }) picArea: ElementRef;
  @ViewChild('profilePic', { static: false }) profilePic: ElementRef;
  @ViewChild('zoomHandle', { static: false }) zoomHandle: ElementRef;
  @ViewChild('zoomContainer', { static: false }) zoomContainer: ElementRef;




  // -----------------------------( ON WINDOW RESIZE )------------------------------ \\
  @HostListener('window:resize')
  onWindowResize() {
    if (this.profilePic != null) {
      this.zoomHandle.nativeElement.style.left = "36px";
      this.SetZoomHandleBoundarys();
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
    this.showDragMessage = true;
    this.setProfilePic(e.target);
  }


  // -----------------------------( SET PROFILE PIC )------------------------------ \\
  setProfilePic(profilePic) {
    this.minusButtonDisabled = true;

    // If the pic's origianl width is larger than its original height
    if (profilePic.naturalWidth > profilePic.naturalHeight) {
      // Get the ratio of width to height
      let ratio = profilePic.naturalWidth / profilePic.naturalHeight;
      // Get the new height value of the pic based on the dimensions of the pic area
      let newPicHeight = this.getSize(this.picArea.nativeElement);

      // Redefine the dimensions of the pic
      profilePic.style.height = newPicHeight + "px";
      profilePic.style.width = (newPicHeight * ratio) + "px";
      profilePic.style.top = ((this.picArea.nativeElement.offsetHeight / 2) - (newPicHeight / 2)) + "px";
      profilePic.style.left = ((this.picArea.nativeElement.offsetWidth / 2) - (profilePic.offsetWidth / 2)) + "px";

      // But if the pic's origianl height is larger than its original width
    } else {

      // Get the ratio of height to width
      let ratio = profilePic.naturalHeight / profilePic.naturalWidth;
      // Get the new width value of the pic based on the dimensions of the pic area
      let newPicWidth = this.getSize(this.picArea.nativeElement);

      // Redefine the dimensions of the pic
      profilePic.style.width = newPicWidth + "px";
      profilePic.style.height = (newPicWidth * ratio) + "px";
      profilePic.style.left = ((this.picArea.nativeElement.offsetWidth / 2) - (newPicWidth / 2)) + "px";
      profilePic.style.top = ((this.picArea.nativeElement.offsetHeight / 2) - (profilePic.offsetHeight / 2)) + "px";
    }

    this.profilePicBaseWidth = profilePic.offsetWidth;
    this.profilePicBaseHeight = profilePic.offsetHeight;
    this.newPicDimensions.left = profilePic.offsetLeft;
    this.newPicDimensions.top = profilePic.offsetTop;
    this.newPicDimensions.width = profilePic.offsetWidth;
    this.newPicDimensions.height = profilePic.offsetHeight;
    this.pivot.x = ((this.picArea.nativeElement.offsetWidth / 2) - this.newPicDimensions.left) / this.newPicDimensions.width;
    this.pivot.y = ((this.picArea.nativeElement.offsetHeight / 2) - this.newPicDimensions.top) / this.newPicDimensions.height;
  }


  // -----------------------------( ON PROFILE PIC MOUSE DOWN )------------------------------ \\
  onProfilePicMouseDown(e) {
    this.showDragMessage = false;
    this.picMoveStartPos.x = e.clientX - e.target.getBoundingClientRect().left;
    this.picMoveStartPos.y = e.clientY - e.target.getBoundingClientRect().top;
  }


  // -----------------------------( ON PROFILE PIC TOUCH START )------------------------------ \\
  onProfilePicTouchStart(e) {
    this.showDragMessage = false;
    this.picMoveStartPos.x = e.touches[0].clientX - e.target.getBoundingClientRect().left;
    this.picMoveStartPos.y = e.touches[0].clientY - e.target.getBoundingClientRect().top;
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
    if (this.profilePic.nativeElement.offsetLeft > this.circleOverlay.left) {
      this.profilePic.nativeElement.style.left = this.circleOverlay.left + "px";
    }

    // Right boundary
    if ((this.profilePic.nativeElement.offsetLeft) + this.profilePic.nativeElement.offsetWidth < this.circleOverlay.right) {
      this.profilePic.nativeElement.style.left = (-this.profilePic.nativeElement.offsetWidth + this.circleOverlay.right) + "px";
    }

    // Top boundary
    if (this.profilePic.nativeElement.offsetTop > this.circleOverlay.top) {
      this.profilePic.nativeElement.style.top = this.circleOverlay.top + "px";
    }

    // Bottom boundary
    if ((this.profilePic.nativeElement.offsetTop) + this.profilePic.nativeElement.offsetHeight < this.circleOverlay.bottom) {
      this.profilePic.nativeElement.style.top = (-this.profilePic.nativeElement.offsetHeight + this.circleOverlay.bottom) + "px";
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


  // -----------------------------( SET ZOOM HANDLE BOUNDARYS )------------------------------ \\
  SetZoomHandleBoundarys() {
    if (this.zoomHandle.nativeElement.offsetLeft == this.zoomBar.nativeElement.offsetLeft) {
      this.newPicDimensions.left = this.profilePic.nativeElement.offsetLeft;
      this.newPicDimensions.top = this.profilePic.nativeElement.offsetTop;
      this.newPicDimensions.width = this.profilePic.nativeElement.offsetWidth;
      this.newPicDimensions.height = this.profilePic.nativeElement.offsetHeight;
      this.pivot.x = ((this.picArea.nativeElement.offsetWidth / 2) - this.newPicDimensions.left) / this.newPicDimensions.width;
      this.pivot.y = ((this.picArea.nativeElement.offsetHeight / 2) - this.newPicDimensions.top) / this.newPicDimensions.height;
    }


    // Left boundary
    if (this.zoomHandle.nativeElement.offsetLeft <= this.zoomBar.nativeElement.offsetLeft) {
      this.minusButtonDisabled = true;
      this.zoomHandle.nativeElement.style.left = this.zoomBar.nativeElement.offsetLeft + "px";
    }
    if (this.zoomHandle.nativeElement.offsetLeft > this.zoomBar.nativeElement.offsetLeft) {
      this.minusButtonDisabled = false;
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


  // -----------------------------( SET CIRCLE OVERLAY )------------------------------ \\
  setCircleOverlay(circleOverlay: HTMLElement, picArea: HTMLElement) {
    let size: number = this.getSize(picArea);
    circleOverlay.style.maxWidth = size + "px";
    circleOverlay.style.maxHeight = size + "px";
    circleOverlay.style.left = ((picArea.offsetWidth / 2) - (circleOverlay.offsetWidth / 2)) + "px";
    circleOverlay.style.top = ((picArea.offsetHeight / 2) - (circleOverlay.offsetHeight / 2)) + "px";


    this.circleOverlay.left = (picArea.offsetWidth / 2) - (circleOverlay.offsetWidth / 2);
    this.circleOverlay.top = (picArea.offsetHeight / 2) - (circleOverlay.offsetHeight / 2);
    this.circleOverlay.right = this.circleOverlay.left + circleOverlay.offsetWidth;
    this.circleOverlay.bottom = this.circleOverlay.top + circleOverlay.offsetHeight;
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
  getSize(picArea): number {
    let size: number;

    // If the height of the pic area is less than its width
    if (picArea.offsetHeight < picArea.offsetWidth) {
      // And if its height is less than 300
      if (picArea.offsetHeight < 300) {
        // Make the size of the circle overlay to be the height of the pic area
        size = picArea.offsetHeight;

        // But if the height of the pic area is 300 or more
      } else {
        // Make the size of the circle overlay to be 300
        size = 300;
      }

      // Or if the width of the pic area is less than its height
    } else {

      // And if its width is less than 300
      if (picArea.offsetWidth < 300) {
        // Make the size of the circle overlay to be the width of the pic area
        size = picArea.offsetWidth;

        // But if the width of the pic area is 300 or more
      } else {
        // Make the size of the circle overlay to be 300
        size = 300;
      }
    }
    return size;
  }


  OpenFileExplorerWindow(pictureSelectInput: HTMLInputElement) {
    // Clear the picture select input (This is so the same filename can be re-entered again and again)
    pictureSelectInput.value = '';
    // Open the file explorer window
    pictureSelectInput.click();
  }


  onPictureSelect(event: UIEvent & { target: HTMLInputElement & { files: Array<string> } }) {
    this.picUrl = event.target.files[0];

    
  }

  onSaveButtonClick() {
    // Create the form data object and append the image
    let formData = new FormData()
    formData.append('image', this.picUrl);
    formData.append('width', this.profilePic.nativeElement.naturalWidth);
    formData.append('height', this.profilePic.nativeElement.naturalHeight);
    formData.append('scale', this.scaleValue.toString());

    // Update the current image
    this.dataService.post('api/Account/UpdateProfilePicture', formData, 'text').subscribe(() => {
      
    })
  }

}