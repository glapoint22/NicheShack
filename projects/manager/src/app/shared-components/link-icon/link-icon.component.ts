import { Component } from '@angular/core';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'link-icon',
  templateUrl: './link-icon.component.html',
  styleUrls: ['./link-icon.component.scss']
})
export class LinkIconComponent {
  constructor(private popupService: PopupService) { }

  onLinkIconClick(sourceElement: HTMLElement) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.showLinkPopup = !this.popupService.showLinkPopup;
  }
}