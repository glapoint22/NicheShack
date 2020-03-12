import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {

  constructor(public menuService: MenuService) { }

  ngOnInit() {
  }

  over() {
    console.log("over")
  }
  out() {
    console.log("out")
  }
}
