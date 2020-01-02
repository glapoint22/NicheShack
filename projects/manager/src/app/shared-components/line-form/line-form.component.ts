import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'line-form',
  templateUrl: './line-form.component.html',
  styleUrls: ['./line-form.component.scss']
})
export class LineFormComponent {
  public showVerticalTab: boolean[] = [true, false, false];

  selectVerticalTab(index: number) {
    for(var i = 0; i < 3; i++) {
      this.showVerticalTab[i] = false;
    }
    this.showVerticalTab[index] = true;
  }
}