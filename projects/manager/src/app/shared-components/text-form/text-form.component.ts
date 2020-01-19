import { Component } from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'text-form',
  templateUrl: './text-form.component.html',
  styleUrls: ['./text-form.component.scss']
})
export class TextFormComponent {
  constructor(public _FormService: FormService) {}
  public showVerticalTab: boolean[] = [true, false, false];

  onFormOpen() {

  }

  selectVerticalTab(index: number) {
    for(var i = 0; i < 3; i++) {
      this.showVerticalTab[i] = false;
    }
    this.showVerticalTab[index] = true;
  }
}