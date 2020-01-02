import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent {
  public showVerticalTab: boolean[] = [true, false, false];

  selectVerticalTab(index: number) {
    for(var i = 0; i < 3; i++) {
      this.showVerticalTab[i] = false;
    }
    this.showVerticalTab[index] = true;
  }
}