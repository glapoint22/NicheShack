import { Component, Input, OnChanges, Output, EventEmitter, DoCheck } from '@angular/core';
import { Image } from '../../../classes/image';
import { PopupService } from '../../../services/popup.service';
import { MediaType } from '../../../classes/media';
import { PromptService } from 'services/prompt.service';

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
  @Output() onLoad: EventEmitter<void> = new EventEmitter();
  private currentImage: string;

  constructor(private promptService: PromptService, private popupService: PopupService) { }


  ngDoCheck() {
    if (this.image && this.currentImage != this.image.url) {
      this.currentImage = this.image.url;
      this.onChange.emit();
    }
  }


  ngOnChanges() {
    if (this.image) this.currentImage = this.image.url;
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
    this.image.id = 0;
    this.image.url = null;
    this.currentImage = null;
    this.onChange.emit();
  }

  onClick(sourceElement: HTMLElement) {
    this.popupService.mediaType = this.mediaType;
    this.popupService.sourceElement = sourceElement;
    this.popupService.mediaBrowserPopup.show = !this.popupService.mediaBrowserPopup.show;
    this.popupService.mediaBrowserPopup.media = this.image;
  }
}