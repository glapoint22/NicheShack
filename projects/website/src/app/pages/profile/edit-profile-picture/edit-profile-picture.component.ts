import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'edit-profile-picture',
  templateUrl: './edit-profile-picture.component.html',
  styleUrls: ['./edit-profile-picture.component.scss']
})
export class EditProfilePictureComponent implements OnInit {
  constructor() { }
  public show: boolean;
  public picUrl: string;
  public picMoveStartPos = { x: null, y: null };
  public zoomHandleMoveStartPos: number;
  private profilePicBaseWidth: number;
  private profilePicBaseHeight: number;
  private circleOverlay = { left: null, top: null, bottom: null, right: null };
  private newPicDimensions = { left: null, top: null, width: null, height: null };
  @ViewChild('picArea', { static: false }) picArea: ElementRef;
  @ViewChild('zoomBar', { static: false }) zoomBar: ElementRef;
  @ViewChild('profilePic', { static: false }) profilePic: ElementRef;
  @ViewChild('zoomHandle', { static: false }) zoomHandle: ElementRef;
  @ViewChild('zoomContainer', { static: false }) zoomContainer: ElementRef;

  ngOnInit() {
  }

  onShow() {
  }

  // -----------------------------( ON MOUSE MOVE )------------------------------ \\
  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (this.picMoveStartPos.x != null) {
      // Move the pic
      this.profilePic.nativeElement.style.left = ((e.clientX - this.picArea.nativeElement.getBoundingClientRect().left) - this.picMoveStartPos.x) + "px";
      this.profilePic.nativeElement.style.top = ((e.clientY - this.picArea.nativeElement.getBoundingClientRect().top) - this.picMoveStartPos.y) + "px";
      // Set the boundarys
      this.SetProfilePicBoundarys();


      this.newPicDimensions.left = parseFloat(this.profilePic.nativeElement.style.left);
      this.newPicDimensions.top = parseFloat(this.profilePic.nativeElement.style.top);
      this.newPicDimensions.width = parseFloat(this.profilePic.nativeElement.style.width);
      this.newPicDimensions.height = parseFloat(this.profilePic.nativeElement.style.height);
    }

    // Move the zoom handle
    if (this.zoomHandleMoveStartPos != null) {
      this.zoomHandle.nativeElement.style.left = ((e.clientX - this.zoomContainer.nativeElement.getBoundingClientRect().left) - this.zoomHandleMoveStartPos) + "px";
      // Set the boundarys
      this.SetZoomHandleBoundarys();
    }
  }


  // -----------------------------( ON MOUSE UP )------------------------------ \\
  @HostListener('mouseup', ['$event'])
  onMouseUp(e: MouseEvent) {
    this.picMoveStartPos.x = null;
    this.zoomHandleMoveStartPos = null;
  }


  // -----------------------------( ON PROFILE PIC LOAD )------------------------------ \\
  onProfilePicLoad(e) {
    // Get the original dimensions of the pic before any alterations
    let originalPicWidth = e.target.getBoundingClientRect().width;
    let originalPicHeight = e.target.getBoundingClientRect().height;

    // If the pic's origianl width is larger than its original height
    if (originalPicWidth > originalPicHeight) {
      // Get the ratio of width to height
      let ratio = originalPicWidth / originalPicHeight;
      // Get the new height value of the pic based on the dimensions of the pic area
      let newPicHeight = this.picArea.nativeElement.getBoundingClientRect().width > 300 ? 300 : this.picArea.nativeElement.getBoundingClientRect().width;

      // Redefine the dimensions of the pic
      e.target.style.height = newPicHeight + "px";
      e.target.style.width = (newPicHeight * ratio) + "px";
      e.target.style.top = ((this.picArea.nativeElement.getBoundingClientRect().height / 2) - (newPicHeight / 2)) + "px";
      e.target.style.left = ((this.picArea.nativeElement.getBoundingClientRect().width / 2) - (e.target.getBoundingClientRect().width / 2)) + "px";

      // But if the pic's origianl height is larger than its original width
    } else {
      // Get the ratio of height to width
      let ratio = originalPicHeight / originalPicWidth;
      // Get the new width value of the pic based on the dimensions of the pic area
      let newPicWidth = this.picArea.nativeElement.getBoundingClientRect().width > 300 ? 300 : this.picArea.nativeElement.getBoundingClientRect().width;

      // Redefine the dimensions of the pic
      e.target.style.width = newPicWidth + "px";
      e.target.style.height = (newPicWidth * ratio) + "px";
      e.target.style.left = ((this.picArea.nativeElement.getBoundingClientRect().width / 2) - (newPicWidth / 2)) + "px";
      e.target.style.top = ((this.picArea.nativeElement.getBoundingClientRect().height / 2) - (e.target.getBoundingClientRect().height / 2)) + "px";
    }


    this.profilePicBaseWidth = e.target.getBoundingClientRect().width;
    this.profilePicBaseHeight = e.target.getBoundingClientRect().height;
    this.newPicDimensions.left = parseFloat(e.target.style.left);
    this.newPicDimensions.top = e.target.getBoundingClientRect().top - this.picArea.nativeElement.getBoundingClientRect().top;
    this.newPicDimensions.width = e.target.getBoundingClientRect().width;
    this.newPicDimensions.height = e.target.getBoundingClientRect().height;
  }


  // -----------------------------( ON PROFILE PIC MOUSE DOWN )------------------------------ \\
  onProfilePicMouseDown(e) {
    this.picMoveStartPos.x = (e.clientX - e.target.getBoundingClientRect().left);
    this.picMoveStartPos.y = (e.clientY - e.target.getBoundingClientRect().top);
  }


  // -----------------------------( SET PROFILE PIC BOUNDARYS )------------------------------ \\
  SetProfilePicBoundarys() {
    // Left boundary
    if (parseFloat(this.profilePic.nativeElement.style.left) > this.circleOverlay.left) {
      this.profilePic.nativeElement.style.left = this.circleOverlay.left + "px";
    }

    // Right boundary
    if ((parseFloat(this.profilePic.nativeElement.style.left)) + this.profilePic.nativeElement.getBoundingClientRect().width < this.circleOverlay.right) {
      this.profilePic.nativeElement.style.left = (-this.profilePic.nativeElement.getBoundingClientRect().width + this.circleOverlay.right) + "px";
    }

    // Top boundary
    if (parseFloat(this.profilePic.nativeElement.style.top) > this.circleOverlay.top) {
      this.profilePic.nativeElement.style.top = this.circleOverlay.top + "px";
    }

    // Bottom boundary
    if ((parseFloat(this.profilePic.nativeElement.style.top)) + this.profilePic.nativeElement.getBoundingClientRect().height < this.circleOverlay.bottom) {
      this.profilePic.nativeElement.style.top = (-this.profilePic.nativeElement.getBoundingClientRect().height + this.circleOverlay.bottom) + "px";
    }
  }


  // -----------------------------( ON ZOOM HANDLE MOUSE DOWN )------------------------------ \\
  onZoomHandleMouseDown(e) {
    this.zoomHandleMoveStartPos = (e.clientX - e.target.getBoundingClientRect().left);
  }


  // -----------------------------( ON ZOOM BAR MOUSE DOWN )------------------------------ \\
  onZoomBarMouseDown(e) {
    this.zoomHandle.nativeElement.style.left = ((e.clientX - this.zoomContainer.nativeElement.getBoundingClientRect().left) - 10) + "px";
    this.zoomHandleMoveStartPos = 10;
    this.SetZoomHandleBoundarys();
  }


  // -----------------------------( SET ZOOM HANDLE BOUNDARYS )------------------------------ \\
  SetZoomHandleBoundarys() {
    // Left boundary
    if (this.zoomHandle.nativeElement.getBoundingClientRect().left - this.zoomContainer.nativeElement.getBoundingClientRect().left < 36) {
      this.zoomHandle.nativeElement.style.left = 36 + "px";
    }

    // Right boundary
    if ((this.zoomHandle.nativeElement.getBoundingClientRect().left - 20 - this.zoomContainer.nativeElement.getBoundingClientRect().left) + this.zoomHandle.nativeElement.getBoundingClientRect().width > this.zoomContainer.nativeElement.getBoundingClientRect().width - 56) {
      this.zoomHandle.nativeElement.style.left = (this.zoomContainer.nativeElement.getBoundingClientRect().width - 56) + "px";
    }

    this.scaleProfilePic();
  }


  // -----------------------------( SET CIRCLE OVERLAY DIMENSIONS )------------------------------ \\
  setCircleOverlayDimensions(picArea, circleOverlay) {
    circleOverlay.style.left = ((picArea.getBoundingClientRect().width / 2) - (circleOverlay.getBoundingClientRect().width / 2)) + "px";
    circleOverlay.style.top = ((picArea.getBoundingClientRect().height / 2) - (circleOverlay.getBoundingClientRect().height / 2)) + "px";
    circleOverlay.style.height = circleOverlay.getBoundingClientRect().width + "px";

    this.circleOverlay.left = (picArea.getBoundingClientRect().width / 2) - (circleOverlay.getBoundingClientRect().width / 2);
    this.circleOverlay.top = (picArea.getBoundingClientRect().height / 2) - (circleOverlay.getBoundingClientRect().height / 2);
    this.circleOverlay.right = this.circleOverlay.left + circleOverlay.getBoundingClientRect().width;
    this.circleOverlay.bottom = this.circleOverlay.top + circleOverlay.getBoundingClientRect().height;
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
    this.profilePic.nativeElement.style.left = (this.newPicDimensions.left - ((this.profilePic.nativeElement.offsetWidth - this.newPicDimensions.width)) * 0.5) + "px";
    this.profilePic.nativeElement.style.top = (this.newPicDimensions.top - ((this.profilePic.nativeElement.offsetHeight - this.newPicDimensions.height)) * 0.5) + "px";

    this.SetProfilePicBoundarys();
  }
}