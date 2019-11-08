import { Component } from '@angular/core';

@Component({
  selector: 'account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent { 
  public show: boolean;
  private isMouseDown;

  onMousedown() {
    if (this.show) {
      this.isMouseDown = true;
    } else {
      this.isMouseDown = false;
    }
  }

  onClick() {
    // Don't show the element if there was a mousedown event
    // This prevents the element from showing when the button is clicked again
    if (this.isMouseDown) {
      this.show = false;
      this.isMouseDown = false;
      return;
    }

    // show the element
    this.show = true;
  }
}