import { Component, Output, EventEmitter } from '@angular/core';
import { PopupService } from '../../../services/popup.service';
import { CoverService } from '../../../services/cover.service';
import { MenuService } from '../../../services/menu.service';
import { DropdownMenuService } from '../../../services/dropdown-menu.service';
import { DataService } from 'services/data.service';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  public preventNoShow: boolean = false;
  @Output() onPopupClose: EventEmitter<void> = new EventEmitter();
  private popup;
  private arrow;
  private popupTop: number;
  public arrowOnTop: boolean = false;
  constructor(public popupService: PopupService, public cover: CoverService, public menuService: MenuService, public dropdownMenuService: DropdownMenuService, public dataService: DataService) { }

  // Show
  private _show: boolean;
  public get show(): boolean {
    return this._show;
  }
  public set show(value: boolean) {

    if (!value) {
      this.popupService.bottomBuffer = 20;
      this.onPopupClose.next();
    }
    this._show = value;
  }



  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    window.setTimeout(() => {
      this.popup = popup;
      this.arrow = arrow;
      this.setPopupTop();
      this.setPopupLeft();
      this.setArrowLeft();
      window.addEventListener('mousemove', this.onMouseMove);
    })
  }


  // --------------------------------( ON MOUSE MOVE )-------------------------------- \\
  onMouseMove = (e: MouseEvent) => {
    if (this.popup.getBoundingClientRect().left != 0) {
      // If the mouse is to the left of the popup
      if (e.clientX < this.popup.getBoundingClientRect().left - 20 ||
        // Or the mouse is to the right of the popup
        (e.clientX > (this.popup.getBoundingClientRect().left + this.popup.getBoundingClientRect().width + 20) ||
          // Or the popup is below the source element
          (this.arrowOnTop &&
            // And the mouse is beyond the top of the source element
            (e.clientY < this.popupService.sourceElement.getBoundingClientRect().top - 20 ||
              // Or the mouse is below the bottom of the popup
              (e.clientY > this.popup.getBoundingClientRect().top + this.popup.getBoundingClientRect().height + 20))) ||
          // Or the popup is above the source element
          (!this.arrowOnTop &&
            // And the mouse is beyond the top of the popup
            (e.clientY < this.popup.getBoundingClientRect().top - 20 ||
              // Or the mouse is below the bottom of the source element
              (e.clientY > this.popupService.sourceElement.getBoundingClientRect().top + this.popupService.sourceElement.getBoundingClientRect().height + this.popupService.bottomBuffer))))) {
        this.onPopupOut();
      }
    }
  }


  // --------------------------------( ON POPUP OUT )-------------------------------- \\
  onPopupOut() {
    // As long as a menu is NOT open
    if (!this.menuService.menu.isVisible && !this.preventNoShow) {

      // Close this popup
      this.show = false;
      this.dropdownMenuService.dropdownMenu.isVisible = false;
      window.removeEventListener('mousemove', this.onMouseMove);
    }
  }


  // --------------------------------( SET POPUP TOP )-------------------------------- \\
  setPopupTop() {
    if (this.popupService.sourceElement.getBoundingClientRect().top - this.popup.getBoundingClientRect().height - (this.arrow.getBoundingClientRect().height - 5) < 0) {
      this.arrowOnTop = true;
      this.popupTop = this.popupService.sourceElement.getBoundingClientRect().top + this.popupService.sourceElement.getBoundingClientRect().height + (this.arrow.getBoundingClientRect().height - 5);
    } else {
      this.arrowOnTop = false;
      this.popupTop = this.popupService.sourceElement.getBoundingClientRect().top - this.popup.getBoundingClientRect().height - (this.arrow.getBoundingClientRect().height - 5);
    }



    let popupTop = this.popupTop;
    let popupBottom = popupTop + this.popup.getBoundingClientRect().height;
    let popupOffset = popupBottom - window.innerHeight;


    // If the menu extends beyond the bottom of the screen
    if (popupBottom > window.innerHeight) {
      // Re-adjust the position of the menu so that the bottom of the menu is placed at the bottom of the screen
      this.popup.style.top = (popupTop - popupOffset) + "px";


      // If the menu does NOT extend beyond the bottom of the screen
    } else {
      // Place the menu as intended
      this.popup.style.top = popupTop + "px";
    }




    // this.popup.style.top = this.popupTop + "px";
  }


  // --------------------------------( SET POPUP LEFT )-------------------------------- \\
  setPopupLeft() {
    let sourceElementCenter = (this.popupService.sourceElement.getBoundingClientRect().width - this.popup.getBoundingClientRect().width) / 2;
    let popupLeft = this.popupService.sourceElement.getBoundingClientRect().left + sourceElementCenter;
    let popupRight = popupLeft + this.popup.getBoundingClientRect().width;
    let popupOffset = popupRight - window.innerWidth;

    // If the popup extends beyond the left side of the screen
    if (popupLeft < 0) {
      // Re-adjust the position of the popup so that the left side of the popup is placed at the left side of the screen
      this.popup.style.left = 5 + "px";


      // If the popup extends beyond the right side of the screen
    } else if (popupRight > window.innerWidth) {
      // Re-adjust the position of the popup so that the right side of the popup is placed at the right side of the screen
      this.popup.style.left = ((popupLeft - popupOffset) - 5) + "px";


      // If the popup does NOT extend beyond either side of the screen
    } else {
      // Place the popup as intended
      this.popup.style.left = popupLeft + "px";
    }
  }


  // --------------------------------( SET ARROW LEFT )-------------------------------- \\
  setArrowLeft() {
    let arrowLeft = ((this.popupService.sourceElement.getBoundingClientRect().left - this.popup.getBoundingClientRect().left) + (this.popupService.sourceElement.getBoundingClientRect().width / 2));

    // If the arrow left position is greater than the width of the popup
    if ((this.popupService.sourceElement.getBoundingClientRect().width / 2) > this.popup.getBoundingClientRect().width) {
      // Position the arrow left in the center of the popup
      arrowLeft = this.popup.getBoundingClientRect().width / 2;
    }

    this.arrow.style.left = arrowLeft + "px";
  }
}
