import { Component, Input, OnChanges, Output, EventEmitter, DoCheck } from '@angular/core';
import { Image } from '../../../classes/image';
import { PromptService } from '../../../services/prompt.service';
import { PopupService } from '../../../services/popup.service';
import { MediaType } from '../../../classes/media';

@Component({
  selector: 'image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnChanges, DoCheck {
  @Input() image: Image;
  @Input() mediaType: MediaType;
  @Input() noDelete: boolean;
  @Output() onChange: EventEmitter<void> = new EventEmitter();
  private currentImageId: string;

  constructor(private promptService: PromptService, private popupService: PopupService) { }


  ngDoCheck() {
    if (this.image && this.currentImageId != this.image.id) {
      this.currentImageId = this.image.id;
      this.onChange.emit();
    }
  }


  ngOnChanges() {
    if (this.image) this.currentImageId = this.image.id;
  }

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
    this.currentImageId = null;
    this.onChange.emit();
  }

  onClick(sourceElement: HTMLElement) {
    this.popupService.mediaType = this.mediaType;
    this.popupService.sourceElement = sourceElement;
    this.popupService.mediaBrowserPopup.show = !this.popupService.mediaBrowserPopup.show;
    this.popupService.mediaBrowserPopup.media = this.image;
  }
}