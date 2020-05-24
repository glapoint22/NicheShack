import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PopupService } from '../../services/popup.service';
import { Link } from '../../classes/link';
import { LinkPopupComponent } from '../popups/link-popup/link-popup.component';

@Component({
  selector: 'link-icon',
  templateUrl: './link-icon.component.html',
  styleUrls: ['./link-icon.component.scss']
})
export class LinkIconComponent implements OnInit {
  @Input() link: Link;
  @Output() onInit: EventEmitter<LinkPopupComponent> = new EventEmitter();
  @Output() onLinkPopupOpen: EventEmitter<void> = new EventEmitter();

  constructor(private popupService: PopupService) { }

  ngOnInit() {
    this.onInit.emit(this.popupService.linkPopup);
  }

  onLinkIconClick(sourceElement: HTMLElement) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.linkPopup.link = this.link;
    this.popupService.linkPopup.show = !this.popupService.linkPopup.show;
    this.onLinkPopupOpen.emit();
  }
}