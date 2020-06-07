import { Component, Input } from '@angular/core';
import { Image } from '../../../classes/image';
import { PromptService } from '../../../services/prompt.service';

@Component({
  selector: 'image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Input() image: Image;
  @Input() loading: boolean;

  constructor(private promptService: PromptService) { }

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
}
