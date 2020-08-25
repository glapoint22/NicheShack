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
  private circleOverlay = { left: null, top: null, bottom: null, right: null }
  @ViewChild('picArea', { static: false }) picArea: ElementRef;
  @ViewChild('profilePic', { static: false }) profilePic: ElementRef;

  ngOnInit() {
  }

  onShow() {
  }

  // -----------------------------( ON MOUSE MOVE )------------------------------ \\
  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (this.picMoveStartPos.x != null) {
      this.profilePic.nativeElement.style.left = ((e.clientX - this.picArea.nativeElement.getBoundingClientRect().left) - this.picMoveStartPos.x) + "px";
      this.profilePic.nativeElement.style.top = ((e.clientY - this.picArea.nativeElement.getBoundingClientRect().top) - this.picMoveStartPos.y) + "px";

      if (this.profilePic.nativeElement.getBoundingClientRect().left - this.picArea.nativeElement.getBoundingClientRect().left > this.circleOverlay.left) this.profilePic.nativeElement.style.left = this.circleOverlay.left + "px";


      if ((this.profilePic.nativeElement.getBoundingClientRect().left - this.picArea.nativeElement.getBoundingClientRect().left) + this.profilePic.nativeElement.getBoundingClientRect().width < this.circleOverlay.right) {
        this.profilePic.nativeElement.style.left = (-this.profilePic.nativeElement.getBoundingClientRect().width + this.circleOverlay.right) + "px";
      }



      if (this.profilePic.nativeElement.getBoundingClientRect().top - this.picArea.nativeElement.getBoundingClientRect().top > this.circleOverlay.top) this.profilePic.nativeElement.style.top = this.circleOverlay.top + "px";


      if ((this.profilePic.nativeElement.getBoundingClientRect().top - this.picArea.nativeElement.getBoundingClientRect().top) + this.profilePic.nativeElement.getBoundingClientRect().height < this.circleOverlay.bottom) {
        this.profilePic.nativeElement.style.top = (-this.profilePic.nativeElement.getBoundingClientRect().height + this.circleOverlay.bottom) + "px";
      }

     
    }
  }


  // -----------------------------( ON MOUSE UP )------------------------------ \\
  @HostListener('mouseup', ['$event'])
  onMouseUp(e: MouseEvent) {
    this.picMoveStartPos.x = null;
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

      // If the pic's origianl height is larger than its original width
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
  }


  // -----------------------------( ON PROFILE PIC MOUSE DOWN )------------------------------ \\
  onProfilePicMouseDown(e) {
    this.picMoveStartPos.x = (e.clientX - e.target.getBoundingClientRect().left);
    this.picMoveStartPos.y = (e.clientY - e.target.getBoundingClientRect().top);
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
}