import { Component } from '@angular/core';
import { FormService } from 'projects/manager/src/app/services/form.service';

@Component({
  selector: 'media-form',
  templateUrl: './media-form.component.html',
  styleUrls: ['./media-form.component.scss']
})
export class MediaFormComponent {
  constructor(public _FormService: FormService) {}
  private itemType: string;


  onOk() {
    this._FormService.showMediaForm = false;
    // this._FormService.productContent.items[this._FormService.productContent.selectedItemTypeIndex].type = this.itemType;
  }

  onCancel() {
    this._FormService.showMediaForm = false;
  }
}