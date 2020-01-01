import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'button-form',
  templateUrl: './button-form.component.html',
  styleUrls: ['./button-form.component.scss']
})
export class ButtonFormComponent {
  public showNormal: boolean = true;
  public showNormalVerticalTab: boolean[] = [true, false, false, false, false, false, false];
  public showHoverVerticalTab: boolean[] = [true, false, false];


  selectNormalVerticalTab(index: number) {
    for(var i = 0; i < 7; i++) {
      this.showNormalVerticalTab[i] = false;
    }
    this.showNormalVerticalTab[index] = true;
  }


  selectHoverVerticalTab(index: number) {
    for(var i = 0; i < 3; i++) {
      this.showHoverVerticalTab[i] = false;
    }
    this.showHoverVerticalTab[index] = true;
  }
}
