import { Component, Input } from '@angular/core';
import { Image } from '../../../classes/image';
import { PromptService } from '../../../services/prompt.service';
import { PopupService } from '../../../services/popup.service';

@Component({
  selector: 'image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Input() image: Image;
  

  constructor(private promptService: PromptService, private popupService: PopupService) { }

  onDeleteImageClick() {
    if (this.image.url) {
      // Prompt the user to delete the image
      let promptTitle = 'Delete Image';
      let promptMessage = 'Are you sure you want to delete this Image?';
      this.promptService.showPrompt(promptTitle, promptMessage, this.deleteImage, this);
    }
  }

  deleteImage() {
    this.image.url = null;
  }

  onClick(sourceElement: HTMLElement) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.mediaBrowserPopup.show = !this.popupService.mediaBrowserPopup.show;
    this.popupService.mediaBrowserPopup.image = this.image;
  }
}
