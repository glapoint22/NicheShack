import { Component } from '@angular/core';
import { FormService } from 'projects/manager/src/app/services/form.service';
// import { Spacing } from 'projects/manager/src/app/classes/spacing';

@Component({
  selector: 'video-widget',
  templateUrl: './video-widget.component.html',
  styleUrls: ['./video-widget.component.scss']
})
export class VideoWidgetComponent {
  // public margins: Spacing = new Spacing();

  constructor(public _FormService: FormService) { }

  // ----------------------------------------------------( ON EDIT )--------------------------------------------------\\
  onEdit() {
    // this._FormService.margins = this.margins;

    // Open the image form
    this._FormService.showVideoForm = true;
  }
}