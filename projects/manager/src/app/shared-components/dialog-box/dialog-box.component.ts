import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  @Input()
  title = 'Dialog Box Name';

  constructor() { }

  ngOnInit() {
  }

}
