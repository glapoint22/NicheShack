import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.scss']
})
export class ImageFormComponent {
  public showVerticalTab: boolean[] = [true, false, false, false, false, false];

  selectVerticalTab(index: number) {
    for(var i = 0; i < 6; i++) {
      this.showVerticalTab[i] = false;
    }
    this.showVerticalTab[index] = true;
  }
}
