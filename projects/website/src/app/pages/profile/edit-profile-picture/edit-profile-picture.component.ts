import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'edit-profile-picture',
  templateUrl: './edit-profile-picture.component.html',
  styleUrls: ['./edit-profile-picture.component.scss']
})
export class EditProfilePictureComponent {
  constructor() { }
  public show: boolean;
  public picUrl: string;
  public picMoveStartPos = { x: null, y: null };
  public zoomHandleMoveStartPos: number;
  private profilePicBaseWidth: number;
  private profilePicBaseHeight: number;
  private pivot = { x: null, y: null };
  private circleOverlay = { left: null, top: null, bottom: null, right: null };
  private newPicDimensions = { left: null, top: null, width: null, height: null };
  @ViewChild('picArea', { static: false }) picArea: ElementRef;
  @ViewChild('zoomBar', { static: false }) zoomBar: ElementRef;
  @ViewChild('profilePic', { static: false }) profilePic: ElementRef;
  @ViewChild('zoomHandle', { static: false }) zoomHandle: ElementRef;
  @ViewChild('zoomContainer', { static: false }) zoomContainer: ElementRef;


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
    // Get the original dimensions of the pic before any alterations
    let originalPicWidth = e.target.offsetWidth;
    let originalPicHeight = e.target.offsetHeight;


    // If the pic's origianl width is larger than its original height
    if (originalPicWidth > originalPicHeight) {
      // Get the ratio of width to height
      let ratio = originalPicWidth / originalPicHeight;
      // Get the new height value of the pic based on the dimensions of the pic area
      let newPicHeight = this.picArea.nativeElement.offsetWidth > 300 ? 300 : this.picArea.nativeElement.offsetWidth;

      // Redefine the dimensions of the pic
      e.target.style.height = newPicHeight + "px";
      e.target.style.width = (newPicHeight * ratio) + "px";
      e.target.style.top = ((this.picArea.nativeElement.offsetHeight / 2) - (newPicHeight / 2)) + "px";
      e.target.style.left = ((this.picArea.nativeElement.offsetWidth / 2) - (e.target.offsetWidth / 2)) + "px";

      // But if the pic's origianl height is larger than its original width
    } else {
      // Get the ratio of height to width
      let ratio = originalPicHeight / originalPicWidth;
      // Get the new width value of the pic based on the dimensions of the pic area
      let newPicWidth = this.picArea.nativeElement.offsetWidth > 300 ? 300 : this.picArea.nativeElement.offsetWidth;

      // Redefine the dimensions of the pic
      e.target.style.width = newPicWidth + "px";
      e.target.style.height = (newPicWidth * ratio) + "px";
      e.target.style.left = ((this.picArea.nativeElement.offsetWidth / 2) - (newPicWidth / 2)) + "px";
      e.target.style.top = ((this.picArea.nativeElement.offsetHeight / 2) - (e.target.offsetHeight / 2)) + "px";
    }

    this.profilePicBaseWidth = e.target.offsetWidth;
    this.profilePicBaseHeight = e.target.offsetHeight;
    this.newPicDimensions.left = e.target.offsetLeft;
    this.newPicDimensions.top = e.target.offsetTop;
    this.newPicDimensions.width = e.target.offsetWidth;
    this.newPicDimensions.height = e.target.offsetHeight;
    this.pivot.x = ((this.picArea.nativeElement.offsetWidth / 2) - this.newPicDimensions.left) / this.newPicDimensions.width;
    this.pivot.y = ((this.picArea.nativeElement.offsetHeight / 2) - this.newPicDimensions.top) / this.newPicDimensions.height;
  }


  // -----------------------------( ON PROFILE PIC MOUSE DOWN )------------------------------ \\
  onProfilePicMouseDown(e) {
    this.picMoveStartPos.x = e.clientX - e.target.getBoundingClientRect().left;
    this.picMoveStartPos.y = e.clientY - e.target.getBoundingClientRect().top;
  }


  // -----------------------------( ON PROFILE PIC TOUCH START )------------------------------ \\
  onProfilePicTouchStart(e) {
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
    this.zoomHandle.nativeElement.style.left = (e.clientX - this.zoomContainer.nativeElement.offsetLeft - (this.zoomHandle.nativeElement.offsetWidth / 2)) + "px";
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
    if (this.zoomHandle.nativeElement.offsetLeft < this.zoomBar.nativeElement.offsetLeft) {
      this.zoomHandle.nativeElement.style.left = this.zoomBar.nativeElement.offsetLeft + "px";
    }

    // Right boundary
    if (this.zoomHandle.nativeElement.offsetLeft + this.zoomHandle.nativeElement.offsetWidth > this.zoomBar.nativeElement.offsetLeft + this.zoomBar.nativeElement.offsetWidth) {
      this.zoomHandle.nativeElement.style.left = (this.zoomBar.nativeElement.offsetLeft + this.zoomBar.nativeElement.offsetWidth - this.zoomHandle.nativeElement.offsetWidth) + "px";
    }
    this.scaleProfilePic();
  }


  // -----------------------------( SET CIRCLE OVERLAY DIMENSIONS )------------------------------ \\
  setCircleOverlayDimensions(picArea: HTMLElement, circleOverlay: HTMLElement) {
    circleOverlay.style.left = ((picArea.offsetWidth / 2) - (circleOverlay.offsetWidth / 2)) + "px";
    circleOverlay.style.top = ((picArea.offsetHeight / 2) - (circleOverlay.offsetHeight / 2)) + "px";
    circleOverlay.style.height = circleOverlay.offsetWidth + "px";

    this.circleOverlay.left = (picArea.offsetWidth / 2) - (circleOverlay.offsetWidth / 2);
    this.circleOverlay.top = (picArea.offsetHeight / 2) - (circleOverlay.offsetHeight / 2);
    this.circleOverlay.right = this.circleOverlay.left + circleOverlay.offsetWidth;
    this.circleOverlay.bottom = this.circleOverlay.top + circleOverlay.offsetHeight;
  }


  // -----------------------------( ON MINUS BUTTON CLICK )------------------------------ \\
  onMinusButtonClick() {
    this.zoomHandle.nativeElement.style.left = (this.zoomHandle.nativeElement.offsetLeft - 30) + "px";
    this.SetZoomHandleBoundarys();
  }



  // -----------------------------( ON PLUS BUTTON CLICK )------------------------------ \\
  onPlusButtonClick() {
    this.zoomHandle.nativeElement.style.left = (this.zoomHandle.nativeElement.offsetLeft + 30) + "px";
    this.SetZoomHandleBoundarys();
  }


  // -----------------------------( SCALE PROFILE PIC )------------------------------ \\
  scaleProfilePic() {
    let zoomHandleLeft = this.zoomHandle.nativeElement.offsetLeft - 36;
    let zoomBarWidth = 2.3 / (this.zoomBar.nativeElement.offsetWidth - 20);
    let scaleValue = 1 + (zoomHandleLeft * zoomBarWidth);



    this.profilePic.nativeElement.style.width = (this.profilePicBaseWidth * scaleValue) + "px";
    this.profilePic.nativeElement.style.height = (this.profilePicBaseHeight * scaleValue) + "px";
    this.profilePic.nativeElement.style.left = (this.newPicDimensions.left - ((this.profilePic.nativeElement.offsetWidth - this.newPicDimensions.width)) * this.pivot.x) + "px";
    this.profilePic.nativeElement.style.top = (this.newPicDimensions.top - ((this.profilePic.nativeElement.offsetHeight - this.newPicDimensions.height)) * this.pivot.y) + "px";

    this.SetProfilePicBoundarys();
  }
}