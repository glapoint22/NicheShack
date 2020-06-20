import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'filters-popup',
  templateUrl: './filters-popup.component.html',
  styleUrls: ['./filters-popup.component.scss', '../popup/popup.component.scss']
})
export class FiltersPopupComponent extends PopupComponent implements OnInit {

  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.popupService.filtersPopup = this;
  }
}
