import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { Link, LinkOption } from '../../../classes/link';

@Component({
  selector: 'link-popup',
  templateUrl: './link-popup.component.html',
  styleUrls: ['./link-popup.component.scss', '../popup/popup.component.scss']
})
export class LinkPopupComponent extends PopupComponent implements OnInit {
  public link: Link;
  public linkOption = LinkOption;


  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.popupService.linkPopup = this;
  }



  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    super.onPopupShow(popup, arrow);

  }
}