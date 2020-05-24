import { Component } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'media-browser-popup',
  templateUrl: './media-browser-popup.component.html',
  styleUrls: ['./media-browser-popup.component.scss', '../popup/popup.component.scss']
})
export class MediaBrowserPopupComponent extends PopupComponent {

  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    super.onPopupShow(popup, arrow);

    
  }


  // -----------------------------( ON DROPDOWN OPTION SELECT )------------------------------ \\
  onDropdownOptionSelect() {

  }
}
