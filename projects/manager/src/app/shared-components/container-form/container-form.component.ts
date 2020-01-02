import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'container-form',
  templateUrl: './container-form.component.html',
  styleUrls: ['./container-form.component.scss']
})
export class ContainerFormComponent {
  public showVerticalTab: boolean[] = [true, false, false, false, false, false];

  selectVerticalTab(index: number) {
    for(var i = 0; i < 6; i++) {
      this.showVerticalTab[i] = false;
    }
    this.showVerticalTab[index] = true;
  }
}
