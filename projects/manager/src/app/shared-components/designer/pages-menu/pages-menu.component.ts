import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pages-menu',
  templateUrl: './pages-menu.component.html',
  styleUrls: ['./pages-menu.component.scss']
})
export class PagesMenuComponent implements OnInit {
  public show: boolean;

  constructor() { }

  ngOnInit() {
  }

  onBlur() {
    // This will make sure the menu will not hide when an input gets the focus
    window.setTimeout(() => {
      let element = document.activeElement;
      if (element.id != 'show-hide' && element.nodeName != 'INPUT') this.show = false;
    })
  }
}