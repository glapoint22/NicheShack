import { Component, Input, OnChanges } from '@angular/core';
import { Background } from '../../../classes/background';
import { KeyValue } from '@angular/common';
import { MediaType } from '../../../classes/media';

@Component({
  selector: 'background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnChanges {
  @Input() background: Background;
  public repeatOptions: Array<KeyValue<string, string>>;
  public positionOptions: Array<KeyValue<string, string>>;
  public attachmentOptions: Array<KeyValue<string, string>>;
  public selectedPositionIndex: number;
  public selectedRepeatIndex: number;
  public selectedAttachmentIndex: number;
  public mediaType = MediaType;

  ngOnChanges() {
    if(!this.background.image) return;

    // Position options
    this.positionOptions = [
      {
        key: 'Left Top',
        value: 'left top'
      },
      {
        key: 'Center Top',
        value: 'center top'
      },
      {
        key: 'Right Top',
        value: 'right top'
      },
      {
        key: 'Left Center',
        value: 'left center'
      },
      {
        key: 'Center Center',
        value: 'center center'
      },
      {
        key: 'Right Center',
        value: 'right center'
      },
      {
        key: 'Left Bottom',
        value: 'left bottom'
      },
      {
        key: 'Center Bottom',
        value: 'center bottom'
      },
      {
        key: 'Right Bottom',
        value: 'right bottom'
      }
    ]



    // Repeat options
    this.repeatOptions = [
      {
        key: 'Repeat',
        value: 'repeat'
      },
      {
        key: 'Repeat X',
        value: 'repeat-x'
      },
      {
        key: 'Repeat Y',
        value: 'repeat-y'
      },
      {
        key: 'No Repeat',
        value: 'no-repeat'
      },
      {
        key: 'Space',
        value: 'space'
      },
      {
        key: 'Round',
        value: 'round'
      }
    ]





    // Attachment options
    this.attachmentOptions = [
      {
        key: 'Scroll',
        value: 'scroll'
      },
      {
        key: 'Fixed',
        value: 'fixed'
      },
      {
        key: 'Local',
        value: 'local'
      }
    ]

    this.selectedPositionIndex = Math.max(0, this.positionOptions.findIndex(x => x.value == this.background.image.position));
    this.selectedRepeatIndex = Math.max(0, this.repeatOptions.findIndex(x => x.value == this.background.image.repeat));
    this.selectedAttachmentIndex = Math.max(0, this.attachmentOptions.findIndex(x => x.value == this.background.image.attachment));
  }
}
