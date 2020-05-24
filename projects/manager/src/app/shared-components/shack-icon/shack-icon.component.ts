import { Component } from '@angular/core';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'shack-icon',
  templateUrl: './shack-icon.component.html',
  styleUrls: ['./shack-icon.component.scss']
})
export class ShackIconComponent {
  constructor(public popupService: PopupService) { }

  onShackClick(sourceElement: HTMLElement) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.hierarchyPopup.show = !this.popupService.hierarchyPopup.show;
  }
}