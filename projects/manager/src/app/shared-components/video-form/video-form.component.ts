import { Component } from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.scss']
})
export class VideoFormComponent {
  public selectedTab: string;
  constructor(public _FormService: FormService) {}


  // -------------------------------------( ON FORM OPEN )-----------------------------------\\
  onFormOpen() {
    // Set the video tab to be the starting tab on form open
    this.selectedTab = "video";

    // this._FormService.initialMargins.top = this._FormService.margins.top;
    // this._FormService.initialMargins.right = this._FormService.margins.right;
    // this._FormService.initialMargins.bottom = this._FormService.margins.bottom;
    // this._FormService.initialMargins.left = this._FormService.margins.left;
  }

  // -------------------------------------( ON TAB SELECT )-----------------------------------\\
  onTabSelect(tab: string) {
    // Display the newly selected tab as being selected
    this.selectedTab = tab;
  }


  // ----------------------------------------------------( ON CANCEL )--------------------------------------------------\\
  onCancel() {
    // this._FormService.margins.top = this._FormService.initialMargins.top;
    // this._FormService.margins.right = this._FormService.initialMargins.right;
    // this._FormService.margins.bottom = this._FormService.initialMargins.bottom;
    // this._FormService.margins.left = this._FormService.initialMargins.left;

    this._FormService.showVideoForm = false;
  }
}