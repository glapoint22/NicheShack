import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'text-form',
  templateUrl: './text-form.component.html',
  styleUrls: ['./text-form.component.scss']
})
export class TextFormComponent {
  public showVerticalTab: boolean[] = [true, false, false];

  selectVerticalTab(index: number) {
    for(var i = 0; i < 3; i++) {
      this.showVerticalTab[i] = false;
    }
    this.showVerticalTab[index] = true;
  }
}