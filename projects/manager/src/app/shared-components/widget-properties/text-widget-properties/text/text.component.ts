import { Component, OnInit, Input } from '@angular/core';
import { TextBox } from 'projects/manager/src/app/classes/text-box';

@Component({
  selector: 'text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {
  @Input() text: TextBox;

  constructor() { }

  ngOnInit() {
  }

}
