import { Component } from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'link-form',
  templateUrl: './link-form.component.html',
  styleUrls: ['./link-form.component.scss']
})
export class LinkFormComponent {

  constructor(public _FormService: FormService) { }

  closeForm() {
    this._FormService.showLinkForm = false;
  }
}