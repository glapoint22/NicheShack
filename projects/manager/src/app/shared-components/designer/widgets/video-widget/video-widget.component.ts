import { Component } from '@angular/core';
import { FormService } from 'projects/manager/src/app/services/form.service';

@Component({
  selector: 'video-widget',
  templateUrl: './video-widget.component.html',
  styleUrls: ['./video-widget.component.scss']
})
export class VideoWidgetComponent {
  constructor(public _FormService: FormService) {}
  public videoForm: any = {open: false}


  // --------------------------Margins--------------------------- \\
  public margins: any = {top: 30, 
                         right: 0, 
                         bottom: 0, 
                         left: 0};

  // ----------------------------------------------------( ON EDIT )--------------------------------------------------\\
  onEdit() {
    this._FormService.videoForm = this.videoForm;
    this._FormService.margins = this.margins;

    // Open the image form
    this.videoForm.open = true;
  }
}