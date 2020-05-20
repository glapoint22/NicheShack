import { Component } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'link-popup',
  templateUrl: './link-popup.component.html',
  styleUrls: ['./link-popup.component.scss', '../popup/popup.component.scss']
})
export class LinkPopupComponent extends PopupComponent{

  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    super.onPopupShow(popup, arrow);

  }
}
