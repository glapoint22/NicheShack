import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss']
})
export class CategoryMenuComponent implements OnInit {
  public show: boolean;
  private isMouseDown: boolean;

  @ViewChild('menu', {static: false}) menu: ElementRef;

  

  onClick() {
    if (this.isMouseDown) {
      this.isMouseDown = false;
      return;
    }

    // show the dropdown and set the focus
    this.show = true;
    this.menu.nativeElement.focus();
  }

  onMousedown() {
    if(this.show) {
      this.isMouseDown = true;
    } else {
      this.isMouseDown = false;
    }

    
  }
  

  constructor() { }

  ngOnInit() {
  }

  onKeydown(event: KeyboardEvent, dropdown: HTMLElement) {
    // If escape is pressed, hide the dropdown
    if (event.code === 'Escape' || event.keyCode === 27) {
      this.show = false;
      dropdown.blur();
    }
  }

}
