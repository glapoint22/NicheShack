import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss']
})
export class DesignerComponent implements OnInit {

  public showPublishMenu: boolean;

  constructor() { }

  ngOnInit() {
  }

}
