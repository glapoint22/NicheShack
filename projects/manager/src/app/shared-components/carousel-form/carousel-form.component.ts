import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'carousel-form',
  templateUrl: './carousel-form.component.html',
  styleUrls: ['./carousel-form.component.scss']
})
export class CarouselFormComponent {
  public showVerticalTab: boolean[] = [true, false, false];

  selectVerticalTab(index: number) {
    for(var i = 0; i < 3; i++) {
      this.showVerticalTab[i] = false;
    }
    this.showVerticalTab[index] = true;
  }
}