import { Component } from '@angular/core';
import { FormService } from 'projects/manager/src/app/services/form.service';

@Component({
  selector: 'video-widget',
  templateUrl: './video-widget.component.html',
  styleUrls: ['./video-widget.component.scss']
})
export class VideoWidgetComponent {

  constructor(public _FormService: FormService) { }

  // ----------------------------------------------------( ON EDIT )--------------------------------------------------\\
  onEdit() {

    // Open the image form
    this._FormService.showVideoForm = true;
  }
}