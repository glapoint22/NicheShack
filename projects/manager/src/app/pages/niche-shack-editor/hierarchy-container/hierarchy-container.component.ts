import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hierarchy-container',
  templateUrl: './hierarchy-container.component.html',
  styleUrls: ['./hierarchy-container.component.scss']
})
export class HierarchyContainerComponent implements OnInit {
  public isCollapsed: boolean;
  public showMenu: boolean;

  constructor() { }

  ngOnInit() {
  }

}
