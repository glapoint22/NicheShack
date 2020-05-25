import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'media-browser-popup',
  templateUrl: './media-browser-popup.component.html',
  styleUrls: ['./media-browser-popup.component.scss', '../popup/popup.component.scss']
})
export class MediaBrowserPopupComponent extends PopupComponent implements OnInit {

  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.popupService.mediaBrowserPopup = this;
  }

  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    super.onPopupShow(popup, arrow);

    
  }


  // -----------------------------( ON DROPDOWN OPTION SELECT )------------------------------ \\
  onDropdownOptionSelect() {

  }


  onMediaSelect(event, mediaItemList) {


    mediaItemList.getFile(event.target.files[0].name)

    
  }
}
